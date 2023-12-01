import promiseMemoize from 'promise-memoize';
import { apiRoutes } from '../api-routes';
import makeApiCall from '../helpers/make-api-call';
import { APICart } from '../../types/api';
import { getUser } from '../user';
import { getCart as internalGetCart } from './internal';

export * from './pre-checkout';
export * from './post-checkout';
export * from './payment';

// PS: This method is only for use in old components that haven't been changed
// to use pivot data and are passing the data as such to multiple such components.
// If it is just a single component consuming the same data, refactor the component
// to rely on pivoted data instead.
export const deprecatedGetCart = promiseMemoize(async (storeId?: number): Promise<APICart> => {
  const { userId, preferences: { storeId: defaultStoreId } } = await getUser();
  const selectedStoreId = storeId || defaultStoreId;

  return makeApiCall<{}, APICart>(apiRoutes.getCart, {
    body: {
      userId,
      ...(selectedStoreId ? { storeId: selectedStoreId } : {})
    },
    ...(selectedStoreId ? { headers: { StoreId: `${selectedStoreId}` } } : {})
  });
}, { resolve: 'json' });

export const clearGetCartMemoization = () => internalGetCart.clear();
