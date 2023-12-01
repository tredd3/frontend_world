import { apiRoutes } from '../api-routes';
import makeApiCall from '../helpers/make-api-call';
import { ShipmentProductPivot } from '../../types/pivot';
import { APICart } from '../../types/api';
import { pivotCartResponse } from '../helpers/pivots';
import { actions, headerWithStoreId } from './shared';
import {
  getUserIdStoreIdAndCartId, deliveryDateByDateId, applyAddressChangeToCart,
  checkoutWithDeliveryDate, clearMemos
} from './internal';
import { ChangeQuantityRequest, RemoveCartItemRequest } from './types';

export const changeQuantityOnOrderReview = async (
  product: ShipmentProductPivot,
  quantity: number,
  dateId: number,
  addressId: number
) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId(addressId);

  const cart = await makeApiCall<ChangeQuantityRequest, APICart>(apiRoutes.addCartItem, {
    body: {
      userId,
      storeId,
      cartId,
      product: [{ skuId: product.skuId, qty: quantity, productType: product.isFc }],
      action: actions.postCheckout,
      deliveryDate: await deliveryDateByDateId(addressId, dateId),
      timeslot: '',
      customerAddressId: addressId,
      isAutoSelected: 0
    },
    ...headerWithStoreId(storeId)
  });

  clearMemos();

  return pivotCartResponse(cart);
};

export const removeFromCartOnOrderReview = async (
  product: ShipmentProductPivot,
  dateId: number,
  addressId: number
) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId(addressId);

  await makeApiCall<RemoveCartItemRequest, APICart>(apiRoutes.removeCartItem, {
    body: {
      userId,
      storeId,
      cartId,
      skuId: product.skuId,
      qty: 0,
      type: product.isFc,
      action: actions.postCheckout,
      deliveryDate: await deliveryDateByDateId(addressId, dateId),
      timeslot: '',
      customerAddressId: addressId,
      isAutoSelected: 0
    },
    ...headerWithStoreId(storeId)
  });

  clearMemos();
};

export const doesAddressChangeCart = async (addressId: number) => {
  const { cartHasBeenUpdated } = await applyAddressChangeToCart(addressId);
  return cartHasBeenUpdated;
};

export const doesDeliveryDateChangeCart = async (addressId: number, dateId: number) => {
  const { cartHasBeenUpdated } = await checkoutWithDeliveryDate(addressId, dateId);
  return cartHasBeenUpdated;
};

export const getUpdatedCart = async (addressId: number, dateId?: number) => {
  // This works because in an SPA flow, the `checkoutWith...` calls should be memoised.
  // When the page is refreshed however, this has the side-effect of creating a new FC cart.
  // Not the end of the world, but not ideal. Meh, we don't have better APIs.
  const { oldCart, newCart } = dateId
    ? await checkoutWithDeliveryDate(addressId, dateId)
    : await applyAddressChangeToCart(addressId);

  return { oldCart, newCart };
};
