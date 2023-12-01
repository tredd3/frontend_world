import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { pivotProduct } from './helpers/pivots';
import { APIProduct, ProductPivot } from '../types';

export const getWishList = async (): Promise<ProductPivot[]> => {
  const { Products } = await makeApiCall<{
    productCategoryType: 'Wishlist';
  }, {
    Products: APIProduct[];
  }>(apiRoutes.getWishListData, {
    body: {
      productCategoryType: 'Wishlist'
    }
  });

  return Products.map(pivotProduct);
};

export const removeFromWishList = async (skuId: number) => makeApiCall(apiRoutes.removeItemFromWishList, {
  body: {
    productCategoryId: '',
    productCategoryType: 'Wishlist',
    productType: 1,
    qty: 0,
    skuId
  }
});
