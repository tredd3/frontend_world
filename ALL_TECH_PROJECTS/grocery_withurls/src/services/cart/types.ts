import { actions } from './shared';

export type NonCheckoutParams = { action: typeof actions.preCheckout };
export type CheckoutParams = {
  action: typeof actions.postCheckout;
  // customerAddressId is actually a string in the request. Need to check if number works.
  // If not, we'll have to cast before sending it.
  customerAddressId: number;
  deliveryDate: string;
  timeslot: '';
  isAutoSelected: 0;
};

export type MaybeCheckout = CheckoutParams | NonCheckoutParams;

export type AddCartItemRequestBase = {
  userId: number;
  storeId?: number;
  cartId: number;
  product: { skuId: number; qty: number; productType: number }[];
};

export type AddCartItemRequest = AddCartItemRequestBase & NonCheckoutParams;

export type ChangeQuantityRequest = AddCartItemRequestBase & MaybeCheckout;

export type RemoveCartItemRequest = {
  userId: number;
  storeId?: number;
  cartId: number;
  skuId: number;
  qty: 0;
  type: number;
} & MaybeCheckout;

export type MoveCartItemRequest = {
  userId: number;
  cartId: number;
  skuId: number;
  qty: number;
  productType: number;
  moveType: 'SaveForLater' | 'MoveToCart';
};

export type DeleteSavedForLaterItemRequest = {
  skuId: number;
  qty: number;
  productType: number;
  productCategoryType: 'SaveForLater';
};

export type PaymentRequestRequest = {
  Amount: number;
  CartId: number;
  MobileNo: number;
  StoreId: number;
  UserId: number;
};

export type PaymentRequestResponse = {
  SUPERMID: string;
  CLIENTID: string;
  MERCHANTNAME: string;
  SPLITTXNFLAG: string;
  CHANNEL: string;
  CURRENCY: string;
  TXNTYPE: string;
  Time: string;
  Checksum: string;
  Amount: string;
  RefNo: string;
  SplitDetails: string;
  ReturnUrl: string;
  PaymentUrl: string;
  Version: string;
  IncludePayModes: string;
  ExcludePayModes: string;
  ProductDescription: string;
  UDF1: string;
  UDF2: string;
  UDF3: string;
  UDF4: string;
  UDF5: string;
};

export type PGPostPayload = {
  merchantid: string;
  clientid: string;
  merchantname: string;
  splittxnflag: string;
  channel: string;
  'transaction.currency': string;
  'transaction.txntype': string;
  'transaction.timestamp': string;
  checksum: string;
  'transaction.amount': string;
  'transaction.extref': string;
  'transaction.splitdetails': string;
  returl: string;
  version: string;
  'preferences.includepaymodes': string;
  'preferences.excludepaymodes': string;
  productdescription: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  token: string;
  'subscriber.customername': string;
  'subscriber.mobilenumber': string;
  'subscriber.customerid': string;
}

export type DeliveryModesAPIRequestType = {
  StoreId: number;
  OrderValue: number;
  Pincode: number;
};

export type CheckoutRequest = {
  storeId: number;
  cartId: number;
  userId: number;
  // Not sure if the user's mobile number is needed
  // userMobile: number;
} & CheckoutParams;

export type PersistedPaymentDetails = {
  refNo: string;
  userId: number;
  storeId: number;
  cartId: number;
};

export type PaymentResponseRequest = {
  RefNo: string;
  UserId: number;
  StoreId: number;
};

export type PlaceCODOrderRequest = {
  CartId: number;
  StoreId: number;
  PaymentMethod: 1;
  MID: 0;
}
