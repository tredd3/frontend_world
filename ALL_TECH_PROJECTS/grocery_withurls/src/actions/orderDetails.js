import { fetchApi } from '../helpers/network/fetch';
import API_ROUTES from '../helpers/network/api-routes';
import { similarItems } from './similarItems';
import { toggleSnackBar } from './appState';
import { getUser } from '../services/user';
import { getConfig } from '../services/config';

export const ORDER_DETAILS = 'ORDER_DETAILS';

const orderDetailsAction = data => ({
  type: ORDER_DETAILS,
  data
});

export const clearOrderDetails = () => dispatch => dispatch(orderDetailsAction({}));

export const orderDetails = (cartId, storeId) => async (dispatch, getState) => {
  const { userId: customerId } = await getUser();

  const body = {
    orderId: cartId,
    pageNumber: 0,
    pageSize: 1,
    storeId,
    customerId
  };

  return fetchApi({
    url: API_ROUTES.getOrderDetails,
    body
  })
    .then(res => dispatch(orderDetailsAction(res.Data.orders)))
    .then(() => {
      const [{ shipments }] = getState().orderDetails;
      const productSkuId = shipments.length && shipments[0].items.length && shipments[0].items[0].skuId;
      if (productSkuId !== undefined && productSkuId != null && productSkuId !== 0) {
        return dispatch(similarItems(0, productSkuId));
      }
      return null;
    });
};

export const cancelOrder = (cancelBody, storeId) => dispatch => (
  fetchApi({
    url: API_ROUTES.cancelOrder,
    body: cancelBody,
    overrides: {
      headers: [{ header: 'StoreId', value: storeId }]
    }
  }).then(
    res => {
      getConfig.clear();
      Promise.all([
        dispatch(toggleSnackBar(true, res.Control.Message, 'success')),
        dispatch(orderDetailsAction(res.Data.orders))
      ]);
    },
    error => {
      dispatch(toggleSnackBar(true, error.Control.Message, 'error'));
    }
  )
);
