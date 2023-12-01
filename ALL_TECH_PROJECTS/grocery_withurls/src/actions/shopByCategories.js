import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';
import store from '../store';

export const SHOPBY_CATEGORIES = 'SHOPBY_CATEGORIES';
export const MORE_SHOPBY_CATEGORIES = 'MORE_SHOPBY_CATEGORIES';
export const SEARCH_TEXT_ACTION = 'SEARCH_TEXT_ACTION';

export const searchTextAction = data => ({
  type: SEARCH_TEXT_ACTION,
  data
});

const shopByCategoriesAction = (data, PageNo) => {
  if (PageNo) {
    return {
      type: MORE_SHOPBY_CATEGORIES,
      data
    };
  }
  return {
    type: SHOPBY_CATEGORIES,
    data
  };
};

export const shopByCategories = (() => {
  let PageNo = 0;
  return (params = {}) => {
    const { Level = 1, CategoryId = 0, increasePagenumber = false } = params;
    if (increasePagenumber) {
      PageNo += 1;
    } else {
      PageNo = 0;
    }

    const StoreId = store.getState().userAddress.address
      ? store.getState().userAddress.address.storeId || store.getState().kirana.selectedKirana.StoreId
      : 0;

    if (Level === 2) {
      return fetchApi({
        url: API_ROUTES.getCategories,
        body: {
          Level,
          CategoryId,
          StoreId: StoreId || 0,
          PageNo,
          pageSize: 10
        }
      });
    }
    return dispatch => fetchApi({
      url: API_ROUTES.getCategories,
      body: {
        Level,
        CategoryId,
        StoreId: StoreId || 0,
        PageNo,
        pageSize: 10
      }
    }).then(response => dispatch(shopByCategoriesAction(response, PageNo)));
  };
})();
