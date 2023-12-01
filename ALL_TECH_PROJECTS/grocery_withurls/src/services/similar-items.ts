import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { pivotProduct } from './helpers/pivots';
import { getUser } from './user';
import { ProductPivot } from '../types';
import { APIProduct } from '../types/api';

type GetSimilarItemsArg = {
  pageNum: number;
  queryTerm: string;
  sort: object;
  filter?: {
    categoryId?: number;
  };
  productSkuId: number;
};

type GetSimilarItemsReturn = {
  products: ProductPivot[];
  count: number;
};

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
export const DEPRECATED_convertProductToAPIProduct = (product: ProductPivot): Partial<APIProduct> => ({
  MRP: product.mrp,
  SP: product.sp,
  ProductName: product.name,
  ProductImage: product.images[0],
  ProductOtherImage: product.images,
  ProductId: product.id,
  ProductSkuId: product.skuId,
  IsFc: product.isFc,
  CategoryId: product.category.id,
  CategoryName: product.category.name,
  ProductAlias: product.alias,
  Disclaimer: product.disclaimer,
  BestBeforeDate: `${product.bestBefore ? product.bestBefore.getTime() : ''}`,
  // eslint-disable-next-line no-nested-ternary
  FoodType: product.isVeg === null ? undefined : (product.isVeg ? 'veg' : 'nonveg'),
  AdditionalInfo: product.additionalInformation
});

export const getSimilarItems = promiseMemoize(async ({
  pageNum, queryTerm, sort, filter = {}, productSkuId
}: GetSimilarItemsArg): Promise <GetSimilarItemsReturn> => {
  const { preferences: { pincode } } = await getUser();

  const { Products, Count } = await makeApiCall(apiRoutes.getSimilarItems, {
    body: {
      requestPayload: {
        filter: {
          ...filter,
          '@type': 'Filter',
          ...(pincode ? { storePincode: pincode } : {})
        },
        pageNumber: pageNum,
        pageSize: 20,
        queryTerm,
        type: 1,
        sort,
        productSkuId
      }
    }
  });

  return { products: Products.map(pivotProduct), count: Count };
}, { resolve: 'json' });
