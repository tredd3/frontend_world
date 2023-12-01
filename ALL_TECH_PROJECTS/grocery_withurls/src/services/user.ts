import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { formatDate } from '../helpers/functional';
import { pivotAPIUser } from './helpers/pivots';
import { APIUser, UserPivot } from '../types';
import { genderStringToCode } from './helpers/generic';

export const getUser = promiseMemoize(async (): Promise<UserPivot> => {
  const user = await makeApiCall<{}, APIUser>(apiRoutes.getUserDetail);
  return pivotAPIUser(user);
});

type UpdateUserArgs = {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: UserPivot['gender'];
  dob?: Date;
  lat?: number;
  lng?: number;
  pincode?: number;
  city?: string;
  storeId?: number;
  storeName?: string;
};

export const updateUser = async ({
  firstName, lastName, email, gender, dob, lat, lng, pincode, city, storeId, storeName
}: UpdateUserArgs) => {
  const userFromApi = await getUser();
  const { userId } = userFromApi;
  const isValidStoreId = storeId !== undefined;
  const isValidStoreName = storeName !== undefined;

  await makeApiCall(apiRoutes.updateUser, {
    body: {
      userId,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email ? { emailId: email } : { emailId: '' }),
      ...(gender && { gender: genderStringToCode(gender) }),
      ...(dob ? { dob: formatDate(dob) } : { dob: '' }),
      preferences: {
        ...userFromApi.preferences,
        ...(pincode && { pincode }),
        ...(lat && { latitude: lat }),
        ...(lng && { longitude: lng }),
        ...(isValidStoreId && { storeId }),
        ...(city && { city }),
        ...(isValidStoreName && { storeName })
      }
    }
  });

  getUser.clear();
};

type AddUserArgs = {
  firstName: string;
  lastName: string;
};

export const addUser = ({ firstName, lastName }: AddUserArgs) => (
  makeApiCall<AddUserArgs, void>(apiRoutes.addUser, {
    body: {
      firstName,
      lastName
    }
  })
);
