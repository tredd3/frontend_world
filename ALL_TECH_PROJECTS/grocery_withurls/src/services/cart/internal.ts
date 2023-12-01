import promiseMemoize from 'promise-memoize';
import { apiRoutes } from '../api-routes';
import makeApiCall from '../helpers/make-api-call';
import { APICart, APIDeliveryOptions } from '../../types/api';
import { getUser } from '../user';
import { pivotCartResponse, pivotDeliveryMode } from '../helpers/pivots';
import { headerWithStoreId, actions } from './shared';
import { getStoreIdFromAddressId, getAddressById } from '../address';
import { DeliveryModesAPIRequestType, CheckoutRequest } from './types';

export const getCart = promiseMemoize(async (storeId?: number) => {
  const { userId, preferences: { storeId: defaultStoreId } } = await getUser();
  const selectedStoreId = storeId || defaultStoreId;

  const cartData: APICart = await makeApiCall<{}, APICart>(apiRoutes.getCart, {
    body: {
      userId,
      ...(selectedStoreId ? { storeId: selectedStoreId } : {})
    },
    ...headerWithStoreId(selectedStoreId)
  });

  return pivotCartResponse(cartData);
}, { resolve: 'json' });

export const clearInternalCart = () => (getCart.clear());

export function getUserIdStoreIdAndCartId (): Promise<{ userId: number; storeId?: number; cartId: number }>;
export function getUserIdStoreIdAndCartId (addressId: number): Promise<{ userId: number; storeId: number; cartId: number }>;
export async function getUserIdStoreIdAndCartId(addressId?: number) {
  // Don't make these calls in parallel, as getCart internally calls getUser.
  const { userId, preferences: { storeId } } = await getUser();
  const { cartId } = await getCart();

  if (!addressId) return { userId, storeId, cartId };

  const addressStoreId = await getStoreIdFromAddressId(addressId);
  if (!addressStoreId) throw new Error('Address doesn\'t have an associated store');

  return { userId, storeId: addressStoreId, cartId };
}

export const getDeliveryModes = promiseMemoize(async (addressId: number) => {
  const { totalPayableAmount } = await getCart();
  const address = await getAddressById(addressId);
  const storeId = await getStoreIdFromAddressId(addressId);
  const apiDeliveryOptions = await makeApiCall<DeliveryModesAPIRequestType, APIDeliveryOptions>(apiRoutes.getDeliveryModes, {
    body: {
      StoreId: Number(storeId),
      OrderValue: totalPayableAmount,
      Pincode: address!.pincode
    },
    ...headerWithStoreId(storeId)
  });

  return apiDeliveryOptions.StoreOrder.StorePickup.map(pivotDeliveryMode);
}, { resolve: 'json' });

export const deliveryDateByDateId = async (addressId: number, dateId: number) => {
  const deliveryModes = await getDeliveryModes(addressId);
  const matchingDate = deliveryModes?.find(date => date.id === dateId);
  if (!matchingDate) throw new Error('dateId is not valid');
  return matchingDate.value;
};

export const applyAddressChangeToCart = promiseMemoize(async (addressId: number) => {
  const storeId = await getStoreIdFromAddressId(addressId);
  if (!storeId) throw new Error('Address doesn\'t have an associated store');

  const oldCart = await getCart();
  const newCart = await getCart(storeId);

  return {
    cartHasBeenUpdated: oldCart.totalPayableAmount !== newCart.totalPayableAmount,
    oldCart,
    newCart
  };
}, { resolve: 'json' });

export const checkoutWithDeliveryDate = promiseMemoize(async (addressId: number, dateId: number) => {
  const { userId, storeId } = await getUserIdStoreIdAndCartId(addressId);
  const address = await getAddressById(addressId);
  const oldCart = await getCart();

  if (!address) throw new Error('addressId is not valid');

  const checkoutResponse = await makeApiCall<CheckoutRequest, APICart>(apiRoutes.checkout, {
    body: {
      storeId,
      cartId: oldCart.cartId,
      userId,
      customerAddressId: address.id,
      isAutoSelected: 0,
      deliveryDate: await deliveryDateByDateId(addressId, dateId),
      action: actions.postCheckout,
      timeslot: ''
    },
    ...headerWithStoreId(storeId)
  });

  const newCart = pivotCartResponse(checkoutResponse);

  return {
    cartHasBeenUpdated: oldCart.totalPayableAmount !== newCart.totalPayableAmount,
    oldCart,
    newCart
  };
}, { resolve: 'json' });

export const clearMemos = () => {
  getCart.clear();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
  checkoutWithDeliveryDate.clear();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
  applyAddressChangeToCart.clear();
};
