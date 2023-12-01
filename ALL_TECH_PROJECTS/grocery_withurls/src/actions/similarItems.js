import { fetchApi } from '../helpers/network/fetch';
import API_ROUTES from '../helpers/network/api-routes';

export const SIMLAR_ITEMS = 'SIMILAR_ITEMS';

const similarItemsAction = data => ({
  type: SIMLAR_ITEMS,
  data
});

export const similarItems = (categoryId = '75', productSkuId = '10005599') => (dispatch, getState) => {
  const appState = getState();
  const kiranaStoreId = appState.kirana.selectedKirana.StoreId ? appState.kirana.selectedKirana.StoreId : 0;
  const storeId = appState.userAddress.address.storeId ? appState.userAddress.address.storeId : kiranaStoreId;
  const body = {
    requestPayload: {
      filter: {},
      pageNumber: 0,
      pageSize: 20,
      productSkuId,
      queryTerm: ' ',
      sort: {},
      type: 1
    }
  };

  if (categoryId) {
    body.requestPayload.filter = {
      '@type': 'Filter',
      categoryId,
      storeId

    };
  } else {
    body.requestPayload.filter = {
      '@type': 'Filter',
      storeId
    };
  }
  return fetchApi({
    url: API_ROUTES.getSimilarItems,
    body
  })
    .then(res => dispatch(similarItemsAction(res)));
};
