import { APIUser, UserPivot } from '../../types';

export const genderCodeToString = (code: APIUser['gender']): UserPivot['gender'] => {
  if (code === undefined) return undefined;
  return code === 1 ? 'male' : 'female';
};

export const genderStringToCode = (genderString: UserPivot['gender']): APIUser['gender'] => {
  if (genderString === undefined || genderString.length === 0) return undefined;
  return genderString === 'male' ? 1 : 2;
};
