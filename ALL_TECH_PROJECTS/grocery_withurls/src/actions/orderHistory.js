import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';
import { getUser } from '../services/user';

export const SEARCH_TEXT_ACTION = 'SEARCH_TEXT_ACTION';

export const searchTextAction = data => ({
  type: SEARCH_TEXT_ACTION,
  data
});

export const getOrderHistory = (async () => {
  let pageNumber = 1;
  const { userId: customerId } = await getUser();
  return (filter, increasePagenumber) => {
    if (increasePagenumber) {
      pageNumber += 1;
    } else {
      pageNumber = 1;
    }
    let body;

    if (filter) {
      body = {
        customerId,
        filter,
        pageNumber,
        pageSize: 10
      };
    } else {
      body = {
        customerId,
        pageNumber,
        pageSize: 10
      };
    }

    return fetchApi({
      url: API_ROUTES.getOrderHistory,
      body
    }).then(
      response => response.Data.orders
    );
  };
})();

export const searchOrderHistory = (async () => {
  let pageNumber = 1;
  const { userId: customerId } = await getUser();

  return (input, increasePagenumber) => {
    if (increasePagenumber) {
      pageNumber += 1;
    } else {
      pageNumber = 1;
    }
    const body = {
      customerId,
      itemName: input,
      pageNumber,
      pageSize: 10
    };

    return fetchApi({
      url: API_ROUTES.searchOrderHistory,
      body
    }).then(
      response => response.Data.orders
    );
  };
})();
