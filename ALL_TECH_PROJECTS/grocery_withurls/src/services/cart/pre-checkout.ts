import { apiRoutes } from '../api-routes';
import makeApiCall from '../helpers/make-api-call';
import { getUser } from '../user';
import {
  ProductPivot, ShipmentProductPivot, DeliveryDatePivot
} from '../../types/pivot';
import { actions, headerWithStoreId } from './shared';
import {
  getCart as internalGetCart, getUserIdStoreIdAndCartId, clearMemos, getDeliveryModes, clearInternalCart
} from './internal';
import {
  AddCartItemRequest, MoveCartItemRequest, DeleteSavedForLaterItemRequest,
  ChangeQuantityRequest, RemoveCartItemRequest
} from './types';
import { getConfig } from '../config';
import { flatMap } from '../../helpers/typed-utils';

export const getCart = () => internalGetCart();

export const addToCart = async (product: ProductPivot, quantity = 1) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId();
  const { shipments } = await internalGetCart();
  const { maxQuantityLimitPerItem } = await getConfig();
  const { skuId } = product;
  let alreadyAddedQuantity = 0;

  const alreadyAddedProduct = flatMap(shipments, shipment => shipment.products)
    .find(({ skuId: productSkuId }) => productSkuId === skuId);

  if (alreadyAddedProduct) {
    alreadyAddedQuantity = alreadyAddedProduct.selectedQuantity;
  }

  const totalQuantity = quantity + alreadyAddedQuantity;

  if (totalQuantity > maxQuantityLimitPerItem) {
    throw new Error(`Cannot add more than ${maxQuantityLimitPerItem} items`);
  }

  await makeApiCall<AddCartItemRequest, {}>(apiRoutes.addCartItem, {
    body: {
      userId,
      storeId,
      cartId,
      action: actions.preCheckout,
      product: [{ skuId: product.skuId, qty: totalQuantity, productType: product.isFc }]
    },
    ...headerWithStoreId(storeId)
  });

  clearMemos();
};

export const moveToSaveForLater = async (product: ShipmentProductPivot) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId();

  await makeApiCall<MoveCartItemRequest, {}>(apiRoutes.moveCartItem, {
    body: {
      userId,
      cartId,
      moveType: 'SaveForLater',
      qty: product.selectedQuantity,
      skuId: product.skuId,
      productType: product.isFc
    },
    ...headerWithStoreId(storeId)
  });
  clearMemos();
};

export const moveToCart = async (product: ShipmentProductPivot) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId();

  await makeApiCall<MoveCartItemRequest, {}>(apiRoutes.moveCartItem, {
    body: {
      userId,
      cartId,
      moveType: 'MoveToCart',
      qty: product.selectedQuantity,
      skuId: product.skuId,
      productType: product.isFc
    },
    ...headerWithStoreId(storeId)
  });
  clearMemos();
};

export const removeFromSavedLater = async (product: ShipmentProductPivot) => {
  await makeApiCall<DeleteSavedForLaterItemRequest, {}>(apiRoutes.removeCartSavedItem, {
    body: {
      skuId: product.skuId,
      qty: product.selectedQuantity,
      productType: product.isFc,
      productCategoryType: 'SaveForLater'
    }
  });

  clearInternalCart();
};

export const changeQuantity = async (product: ShipmentProductPivot, quantity: number) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId();
  const { maxQuantityLimitPerItem } = await getConfig();

  if (quantity < 1) {
    throw new Error('Quantity cannot be less than 1');
  }

  if (quantity > maxQuantityLimitPerItem) {
    throw new Error(`Cannot add more than ${maxQuantityLimitPerItem} items`);
  }

  await makeApiCall<ChangeQuantityRequest, {}>(apiRoutes.addCartItem, {
    body: {
      userId,
      cartId,
      product: [{ skuId: product.skuId, qty: quantity, productType: product.isFc }],
      action: actions.preCheckout
    },
    ...headerWithStoreId(storeId)
  });

  clearMemos();
};

export const removeFromCart = async (product: ShipmentProductPivot) => {
  const { userId, storeId, cartId } = await getUserIdStoreIdAndCartId();

  await makeApiCall<RemoveCartItemRequest, {}>(apiRoutes.removeCartItem, {
    body: {
      userId,
      cartId,
      skuId: product.skuId,
      qty: 0,
      type: product.isFc,
      action: actions.preCheckout
    },
    ...headerWithStoreId(storeId)
  });
  clearMemos();
};

export const getDeliveryDates = async (addressId: number): Promise<DeliveryDatePivot[] | null> => {
  const modes = await getDeliveryModes(addressId);
  return modes ? modes.map(({ id, label, isOpen }) => ({ id, label, isOpen })) : null;
};

export const confirmChangedCart = async (): Promise<{}> => {
  const { userId } = await getUser();

  return makeApiCall<{
    userId: number;
    action: typeof actions.postCheckout;
  }, {}>(apiRoutes.getCart, {
    body: { userId, action: actions.postCheckout }
  });
};
