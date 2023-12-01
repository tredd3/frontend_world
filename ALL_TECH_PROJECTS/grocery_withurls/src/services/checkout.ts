import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import { getAddressById } from './address';
import { getCart } from './cart';
import { APIShipment } from '../types/api';

type CheckoutRequestBody = {
  deliveryDate: string;
  timeslot: string;
  storeId: number | undefined;
  cartId: number;
  userId: number;
  userMobile: number;
  customerAddressId: number | undefined;
  isAutoSelected: number;
}
export type CheckoutRequestData = {
  deliveryDate: string;
  timeslot: string;
  addressId: number;
  storeId: number;
 }

export type CheckoutData = {
  CartId: string;
  UserId: string;
  Shipments: APIShipment[];
  TotalAmount: number;
  TotalMRPDiscount: number;
  TotalOrderLevelDiscount: number;
  TotalDeliveryCharge: number;
  TotalItem: number;
  TotalCouponDiscount: number;
  TotalPay: number;
  ConfiguredDeliveryCharge: string;
}

export const checkoutOrder = promiseMemoize(async (payload: CheckoutRequestData) => {
  const user = await getUser();
  const address = await getAddressById(Number(payload.addressId));
  const cart = await getCart();

  const { storeId } = payload;

  const requestPayload: CheckoutRequestBody = {
    storeId,
    cartId: cart.cartId,
    userId: user.userId,
    userMobile: user.phoneNumber,
    customerAddressId: address && address.id,
    isAutoSelected: 0,
    deliveryDate: payload.deliveryDate,
    timeslot: payload.timeslot
  };

  const customHeader = { StoreId: String(storeId) };

  const data = await makeApiCall<CheckoutRequestBody, CheckoutData>(apiRoutes.checkout,
    {
      headers: customHeader,
      body: {
        ...requestPayload
      }
    });
  return data;
}, {
  resolve: 'json'
});
