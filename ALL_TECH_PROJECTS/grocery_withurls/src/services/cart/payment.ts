import { apiRoutes } from '../api-routes';
import makeApiCall from '../helpers/make-api-call';
import { getUser } from '../user';
import { getStoreIdFromAddressId } from '../address';
import { getConfig } from '../config';
import { headerWithStoreId } from './shared';
import { getDeliveryModes, clearMemos } from './internal';
import postToPage from './post-to-page';
import {
  PaymentRequestRequest, PaymentRequestResponse, PersistedPaymentDetails,
  PGPostPayload, PaymentResponseRequest, PlaceCODOrderRequest
} from './types';
import { getUpdatedCart } from './post-checkout';

const paymentModes = [
  { id: 'online', label: 'Credit Card / Debit Card / Net Banking' },
  { id: 'cod', label: 'Cash on Delivery (COD)' }
] as const;

export type PaymentMethodId = typeof paymentModes[number]['id'];
export const paymentLabelById = (id: PaymentMethodId) => (
  paymentModes.find(pm => pm.id === id)!.label
);

// Stuff on the left is key names we receive from our API
// Stuff on the right is the key names we need to post to the PG
const paymentKeyMapping = {
  SUPERMID: 'merchantid',
  CLIENTID: 'clientid',
  MERCHANTNAME: 'merchantname',
  CHANNEL: 'channel',
  ReturnUrl: 'returl',
  Amount: 'transaction.amount',
  CURRENCY: 'transaction.currency',
  Checksum: 'checksum',
  ExcludePayModes: 'preferences.excludepaymodes',
  IncludePayModes: 'preferences.includepaymodes',
  ProductDescription: 'productdescription',
  SPLITTXNFLAG: 'splittxnflag',
  SplitDetails: 'transaction.splitdetails',
  TXNTYPE: 'transaction.txntype',
  Time: 'transaction.timestamp',
  UDF1: 'udf1',
  UDF2: 'udf2',
  UDF3: 'udf3',
  UDF4: 'udf4',
  UDF5: 'udf5',
  Version: 'version',
  RefNo: 'transaction.extref'
} as const;

const mapPaymentKeysFromApiToPG = (paymentResponse: PaymentRequestResponse) => (
  Object.entries(paymentKeyMapping).reduce(
    (obj, [apiKey, pgKey]) => ({ ...obj, [pgKey]: paymentResponse[apiKey] }),
    {}
  )
);

const paymentDetailsStorageKey = 'pre-payment-state';

const persistPaymentDetails = (paymentDetails: PersistedPaymentDetails) => (
  sessionStorage.setItem(paymentDetailsStorageKey, JSON.stringify(paymentDetails))
);

const getPersistedPaymentDetails = () => {
  const fromStorage = sessionStorage.getItem(paymentDetailsStorageKey);
  if (!fromStorage) return null;
  return JSON.parse(fromStorage) as PersistedPaymentDetails;
};

export type PaymentMethod = {
  id: PaymentMethodId;
  label: typeof paymentModes[number]['label'];
  disabledReason?: string;
  enabled: boolean;
}

export type PaymentMethodsReturnType = {
  totalPayableAmount: number;
  storeName?: string;
  paymentMethods: PaymentMethod[];
}

export const getPaymentModes = async (addressId: number, dateId: number): Promise<PaymentMethodsReturnType> => {
  const deliveryModes = await getDeliveryModes(addressId);
  const { maxCODLimit, codLimitErrorMessage } = await getConfig();
  const cart = await getUpdatedCart(addressId, dateId);

  const isCODEnabled = cart.newCart.totalPayableAmount < maxCODLimit;

  return {
    totalPayableAmount: cart.newCart.totalPayableAmount,
    storeName: deliveryModes?.find(dm => dm.id === dateId)?.store.name,
    paymentMethods: paymentModes.map(pm => {
      const isPaymentModeEnabled = pm.id === 'cod' ? isCODEnabled : true;
      return {
        ...pm,
        enabled: isPaymentModeEnabled,
        ...(!isPaymentModeEnabled && { disabledReason: codLimitErrorMessage })
      };
    })
  };
};

const getCartIdStoreIdUserIdAndPhoneNumber = async (addressId: number, dateId: number) => {
  const { newCart: { cartId } } = await getUpdatedCart(addressId, dateId);

  const selectedDeliveryMode = (await getDeliveryModes(addressId))?.find(dm => dm.id === dateId);
  if (!selectedDeliveryMode) throw new Error('Delivery date is invalid');

  const storeId = selectedDeliveryMode.store.isKdp ? selectedDeliveryMode.store.storeId : await getStoreIdFromAddressId(addressId);
  if (!storeId) throw new Error('Couldn\'t find a store id');

  const { userId, phoneNumber } = await getUser();

  return {
    cartId, storeId, userId, phoneNumber
  };
};

const createPaymentRequest = async (addressId: number, dateId: number) => {
  const {
    cartId, storeId, userId, phoneNumber
  } = await getCartIdStoreIdUserIdAndPhoneNumber(addressId, dateId);
  const { newCart: { totalPayableAmount } } = await getUpdatedCart(addressId, dateId);

  return makeApiCall<PaymentRequestRequest, PaymentRequestResponse>(apiRoutes.getPaymentRequest, {
    body: {
      Amount: totalPayableAmount,
      CartId: cartId,
      MobileNo: phoneNumber,
      UserId: userId,
      StoreId: storeId
    },
    ...headerWithStoreId(storeId)
  });
};

type RedirectToPGargs = {
  paymentProperties: PaymentRequestResponse;
  cartId: number;
  storeId: number;
  userId: number;
  phoneNumber: number;
}

const redirectToPG = ({
  paymentProperties, cartId, storeId, userId, phoneNumber
}: RedirectToPGargs) => {
  const { PaymentUrl, RefNo } = paymentProperties;

  persistPaymentDetails({
    refNo: String(RefNo),
    cartId,
    storeId,
    userId
  });

  postToPage(PaymentUrl, {
    ...mapPaymentKeysFromApiToPG(paymentProperties),
    token: '',
    'subscriber.customername': 'JIO-KART',
    'subscriber.mobilenumber': String(phoneNumber),
    'subscriber.customerid': String(phoneNumber)
  } as PGPostPayload);
};

const placeCODorder = async (addressId: number, dateId: number) => {
  const { maxCODLimit } = await getConfig();
  const { newCart: { totalPayableAmount } } = await getUpdatedCart(addressId, dateId);

  if (totalPayableAmount > maxCODLimit) {
    throw new Error(`Maximum order value is ${maxCODLimit}.`);
  }

  const { cartId, storeId } = await getCartIdStoreIdUserIdAndPhoneNumber(addressId, dateId);
  return makeApiCall<PlaceCODOrderRequest, {}>(apiRoutes.placeOrder, {
    body: {
      CartId: cartId,
      StoreId: storeId,
      PaymentMethod: 1,
      MID: 0
    },
    ...headerWithStoreId(storeId)
  });
};

// If the payment mode is 'cod', the promise is resolved with 'true'.
// If the payment mode is not 'cod', the promise is resolved with 'false'.
// The order is only placed when the return value is true!
export const placeOrder = async (addressId: number, dateId: number, paymentMethod: PaymentMethodId) => {
  if (paymentMethod === 'cod') {
    await placeCODorder(addressId, dateId);
    clearMemos();
    return true; // Signals that order-placement was successful (COD)
  }

  const paymentProperties = await createPaymentRequest(addressId, dateId);
  redirectToPG({
    paymentProperties,
    ...(await getCartIdStoreIdUserIdAndPhoneNumber(addressId, dateId))
  });
  return false; // Signals that order-placement isn't complete (PG-redirect)
};

export const isPaymentSuccessful = async () => {
  const paymentDetails = getPersistedPaymentDetails()!;
  await makeApiCall<PaymentResponseRequest, {}>(apiRoutes.getPaymentResponse, {
    body: {
      RefNo: paymentDetails.refNo,
      UserId: paymentDetails.userId,
      StoreId: paymentDetails.storeId
    }
  });

  return paymentDetails.cartId;
};
