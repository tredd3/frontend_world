import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import { APIDashboardProduct, DashboardProductPivot } from '../types';
import { pivotDashboardProduct } from './helpers/pivots';

type APIRequest = {
  bannerId: number;
  isFC: 1;
  latitude: number;
  longitude: number;
  mobileNo: number;
  size: number;
  type: number;
  subType: number;
  pageNum: number;
  pincode: number;
  storeId: number;
  userId: number;
};

export type APIResponse = {
  products: APIDashboardProduct[];
  Count: number;
};

type GetAllDashboardDataArgs = {
  bannerId: number;
  type: number;
  subType: number;
  pageNum: number;
}

export type GetAllDashboardDataReturn = {
  products: DashboardProductPivot[];
  totalCount: number;
}

export const getAllDashboardData = promiseMemoize(
  async ({
    bannerId,
    type,
    subType,
    pageNum
  }: GetAllDashboardDataArgs): Promise<GetAllDashboardDataReturn> => {
    const {
      userId,
      phoneNumber,
      preferences: {
        storeId, pincode, lat, lng
      }
    } = await getUser();
    const { products, Count } = await makeApiCall<APIRequest, APIResponse>(apiRoutes.viewAllDashboard, {
      body: {
        bannerId,
        isFC: 1,
        latitude: lat || 0,
        longitude: lng || 0,
        mobileNo: phoneNumber,
        pageNum,
        pincode: pincode || 0,
        size: 20,
        storeId: storeId || 0,
        subType,
        type,
        userId
      }
    });

    return { products: products.map(pivotDashboardProduct), totalCount: Count };
  },
  { resolve: 'json' }
);
