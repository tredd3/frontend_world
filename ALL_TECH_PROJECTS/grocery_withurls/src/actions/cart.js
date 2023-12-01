import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';
import {
  addCartApiBody,
  removeCartApiBody,
  moveItemApiBody,
  removeSaveLaterCartApiBody
} from '../helpers/makeApiBody';
import store from '../store';
import { toggleSnackBar } from './appState';
import { getConfig } from '../services/config';
import { getUser } from '../services/user';
import { clearGetCartMemoization, deprecatedGetCart } from '../services/cart';
import { checkoutOrder } from '../services/checkout';

export const CART_GET_ITEMS = 'CART_GET_ITEMS';
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const GET_DELIVERY_MODES = 'GET_DELIVERY_MODES';
export const CHECKOUT = 'CHECKOUT';
export const PAYMENT_MODE = 'PAYMENT_MODE';
export const SET_DELIVERY_MODE = 'SET_DELIVERY_MODE';
export const UPDATE_PRD_QTY_OBJ = 'UPDATE_PRD_QTY_OBJ';

const cartGetItemsAction = payload => ({
  type: CART_GET_ITEMS,
  payload
});

const cartDeliveryModes = payload => ({
  type: GET_DELIVERY_MODES,
  payload
});

const doTheCheckout = payload => ({
  type: CHECKOUT,
  payload
});

const updatePaymentModeAction = payload => ({
  type: PAYMENT_MODE,
  payload
});

const selectDeliveryMode = payload => ({
  type: SET_DELIVERY_MODE,
  payload
});

const updatePrdQtyObj = payload => ({
  type: UPDATE_PRD_QTY_OBJ,
  payload
});

export const getDeliveryModes = () => (dispatch, getState) => fetchApi({
  url: API_ROUTES.getDeliveryModes,
  body: {
    StoreId: getState().userAddress.addresses.length > 0
      && (
        getState().userAddress.address.storeId
        || getState().kirana.selectedKirana.StoreId
        || getState().userAddress.address.defaultStore
      ),
    OrderValue: getState().cart.TotalPay
  }
})
  .then(res => dispatch(cartDeliveryModes(res.Data.StoreOrder)))
  .catch(error => dispatch(toggleSnackBar(true, error.Control && error.Control.Message, 'error')));

export const cartGetItems = (isReset, action) => async (dispatch, getState) => {
  let user;
  try {
    user = await getUser();
  } catch (e) {
    // Temporary fix: Silent catch for new user
    return;
  }

  const { preferences: { storeId } } = user;
  const overrides = {};
  const body = {
    userId: getState().user.userId,
    isReset,
    action
  };
  if (storeId) {
    body.storeId = storeId;
    overrides.headers = [{ header: 'StoreId', value: storeId }];
  }
  fetchApi({
    url: API_ROUTES.getCart,
    body,
    overrides
  })
    .then(res => {
      const prdQtyObj = {};
      if (res.Data.Shipments.length) {
        const prdArr = res.Data.Shipments[0].Product;
        prdArr.forEach(product => {
          prdQtyObj[product.ProductSkuId] = product.SelectedQuantity;
        });
      }
      return Promise.all([
        dispatch(cartGetItemsAction(res.Data)),
        dispatch(updatePrdQtyObj(prdQtyObj))
      ]);
    },
    () => {
      dispatch(cartGetItemsAction({}));
    });
};

export const cartAddItem = product => async dispatch => {
  const body = await addCartApiBody(product);
  const user = await getUser();
  const { preferences: { storeId } } = user;
  const overrides = {};

  if (storeId) {
    body.storeId = storeId;
    overrides.headers = [{ header: 'StoreId', value: storeId }];
  }

  return fetchApi({
    url: API_ROUTES.addCartItem,
    body,
    overrides
  })
    .then(() => {
      // clear memozation for getcart and deprecated get cart
      // as when we try to change payment mode we always see
      // old total amount rather than new changed total amount

      const { deliveryModes } = product;
      if (deliveryModes && Object.keys(deliveryModes).length !== 0) {
        clearGetCartMemoization();
        deprecatedGetCart.clear();
        checkoutOrder.clear();
      }

      Promise.all([
        dispatch(toggleSnackBar(true, 'Item added to Cart', 'success')),
        dispatch(cartGetItems())
      ]);
    },
    () => {
      store.dispatch(toggleSnackBar(true, 'Error While Adding to cart', 'error'));
      return 'ERROR';
    });
};

export const cartAddExistingItem = product => async (dispatch, getState) => {
  const acc = [];
  const { cart } = getState();

  cart.Shipments && cart.Shipments.forEach(shipment => {
    const currentProduct = shipment.Product.find(item => Number(product.skuId) === item.ProductSkuId);
    if (currentProduct) {
      acc.push(currentProduct);
    }
  });

  const { maxQuantityLimitPerItem } = await getConfig();
  if (acc.length === 1 && (Number(acc[0].SelectedQuantity) + Number(product.Quantity)) > maxQuantityLimitPerItem) {
    return dispatch(toggleSnackBar(true, `Cannot add more than ${maxQuantityLimitPerItem} items`, 'error'));
  }

  if (acc.length < 1) {
    return dispatch(cartAddItem(product));
  }

  return dispatch(cartAddItem({
    ...product,
    Quantity: acc[0].SelectedQuantity + product.Quantity
  }));
};

export const cartRemoveItem = product => dispatch => {
  const body = removeCartApiBody(product);
  return fetchApi({
    url: API_ROUTES.removeCartItem,
    body
  })
    .then(() => {
      checkoutOrder.clear();
      clearGetCartMemoization();
      deprecatedGetCart.clear();
      dispatch(cartGetItems());
    });
};

export const emptyCart = () => dispatch => dispatch(updatePrdQtyObj({}));

export const cartMoveItem = product => dispatch => fetchApi({
  url: API_ROUTES.moveCartItem,
  body: moveItemApiBody(product)
}).then(() => dispatch(cartGetItems()));

export const checkout = data => dispatch => dispatch(doTheCheckout(data));
export const updatePaymentMode = data => dispatch => dispatch(updatePaymentModeAction(data));
export const selectingDeliveryMode = mode => dispatch => dispatch(selectDeliveryMode(mode));

export const cartSaveLaterDeleteItem = product => dispatch => fetchApi({
  url: API_ROUTES.removeCartSavedItem,
  body: removeSaveLaterCartApiBody(product)
})
  .then(() => dispatch(cartGetItems()));
