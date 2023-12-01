import { fetchApi } from '../helpers/network/fetch';
import API_ROUTES from '../helpers/network/api-routes';
import { similarItems } from './similarItems';

export const PRODUCT_DETAILS = 'PRODUCT_DETAILS';

const productDetailsAction = data => ({
  type: PRODUCT_DETAILS,
  data
});

export const productDetails = productSkuId => {
  const body = {
    requestPayload: {
      filter: {
        productSkuId: Number(productSkuId),
        '@type': 'Filter'
      },
      pageNumber: 0,
      pageSize: 1,
      queryTerm: ' ',
      sort: {
        isFc: 'desc',
        isUKA: 'desc'
      }
    }
  };
  return (dispatch, getState) => {
    const appState = getState();
    const userAddress = appState.userAddress ? appState.userAddress : {};
    const address = userAddress.address ? userAddress.address : {};
    const pincode = address.pincode ? address.pincode : 0;
    const storeId = (address.storeId && address.storeId !== undefined) ? address.storeId : 0;
    console.log(`Pincode is ${pincode}`);
    console.log(`StoreId is ${storeId}`);
    if (pincode !== 0) {
      body.requestPayload.filter.storePincode = pincode;
    }
    if (storeId !== 0) {
      body.requestPayload.storeId = storeId;
    }
    return fetchApi({ url: API_ROUTES.getProductDetails, body })
      .then(res => {
        const data = res.Data ? res.Data : {};
        const storeProduct = data.StoreProduct ? data.StoreProduct : {};
        const categoryId = storeProduct.CategoryId;
        console.log(categoryId);
        dispatch(productDetailsAction(res));
        dispatch(similarItems(categoryId, productSkuId));
      });
  };
};
