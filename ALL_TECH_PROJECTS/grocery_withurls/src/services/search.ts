import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { pivotProduct } from './helpers/pivots';
import { ProductPivot } from '../types';

export type SearchProductArg = {
  pageNumber: number;
  queryTerm: string;
  sort: {};
  filter: {[key: string]: any};
  storeId?: number;
}

type SearchProductReturn = {
  products: ProductPivot[];
  count: number;
  filters: [];
}

export const searchProduct = promiseMemoize(async ({
  pageNumber,
  queryTerm,
  sort,
  filter,
  storeId
}: SearchProductArg): Promise<SearchProductReturn> => {
  const { Products, Count, Filters } = await makeApiCall(apiRoutes.getProductSearch, {
    body: {
      requestPayload: {
        filter,
        pageNumber,
        pageSize: 10,
        queryTerm,
        source: [],
        sort,
        ...(storeId ? { storeId } : null)
      }
    }
  });

  return { products: Products.map(pivotProduct), count: Count, filters: Filters };
}, { resolve: 'json' });
