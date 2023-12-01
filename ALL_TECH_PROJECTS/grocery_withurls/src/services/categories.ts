import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import { CategoryPivot } from '../types';

type APICategory = {
  CategoryName: string;
  CategoryId: number;
  CategoryIcon: string;
  CategoryImage: string;
};

type APIRequest = {
  CategoryId?: number;
  Level: 2;
  StoreId: number;
  PageNo: number;
};

type APIResponse = {
  Categories: APICategory[];
};

const convertAPICategoryToCategory = (category: APICategory): CategoryPivot => ({
  id: category.CategoryId,
  name: category.CategoryName,
  icon: category.CategoryIcon,
  image: category.CategoryImage
});

export const getCategories = promiseMemoize(async (id: number) => {
  const { preferences: { storeId } } = await getUser();
  const { Categories } = await makeApiCall<APIRequest, APIResponse>(apiRoutes.getCategories, {
    body: {
      Level: 2,
      ...(id && { CategoryId: id }),
      StoreId: storeId || 0,
      PageNo: 0
    }
  });

  return Categories.map(convertAPICategoryToCategory);
}, { resolve: 'json' });
