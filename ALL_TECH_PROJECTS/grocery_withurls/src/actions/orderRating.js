import { fetchApi } from '../helpers/network/fetch';
import API_ROUTES from '../helpers/network/api-routes';
import { ORDER_RATED } from './constants';
import { getUser } from '../services/user';
import { getConfig } from '../services/config';

const orderRated = data => ({
  type: ORDER_RATED,
  data
});

export const addOrderRating = (rating = 0) => async dispatch => {
  const { userId: customerId } = await getUser();
  const { lastOrderDetails } = await getConfig();
  const { storeId, orderId } = lastOrderDetails || {};
  const body = {
    StoreId: storeId,
    OrderId: orderId,
    CustomerId: customerId || 0,
    Rating: rating.toString(),
    Comment: ''
  };

  return fetchApi({ url: API_ROUTES.orderRating, body })
    .then(() => {
      // clearing getConfig to avoid pop coming from config data
      getConfig.clear();
      dispatch(orderRated({ orderRated: true }));
    });
};
