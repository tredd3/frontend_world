import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { APIProduct } from '../types/api';
import { getUser } from './user';
import { pivotProduct } from './helpers/pivots';

type GetProductDetailApiRequest = {
  filter: {
    productSkuId: number;
    '@type': 'Filter';
    storePincode?: number;
  };
  pageNumber: number;
  pageSize: number;
  queryTerm: string;
  sort: {
    isFc: string; // ToDo: 'asc' || 'desc' ?
    isUKA: string; // Ditto
  };
  storeId?: number;
}

export const getProductDetail = promiseMemoize(async (skuId: number) => {
  const { preferences: { storeId, pincode } } = await getUser();

  const requestPayload: GetProductDetailApiRequest = {
    filter: {
      productSkuId: Number(skuId),
      '@type': 'Filter',
      ...(pincode ? { storePincode: pincode } : {})
    },
    pageNumber: 0,
    pageSize: 1,
    queryTerm: ' ',
    sort: {
      isFc: 'desc',
      isUKA: 'desc'
    },
    ...(storeId ? { storeId } : {})
  };

  const { StoreProduct } = await makeApiCall<
    { requestPayload: GetProductDetailApiRequest },
    { StoreProduct: APIProduct }
  >(apiRoutes.getProductDetails, {
    body: {
      requestPayload
    }
  });
  return pivotProduct(StoreProduct);
}, {
  resolve: 'json'
});

type AddItemToWishlistApiRequest = {
  productCategoryId: '';
  productCategoryType: 'Wishlist';
  productType: 1;
  qty: 0;
  skuId: number;
};

export const addItemToWishlist = async (skuId: number) => makeApiCall<AddItemToWishlistApiRequest, {}>(apiRoutes.addItemToWishList, {
  body: {
    productCategoryId: '',
    productCategoryType: 'Wishlist',
    productType: 1,
    qty: 0,
    skuId
  }
});
