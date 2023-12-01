import { SET_USER, NEW_USER, SET_NEW_AUTH_TOKEN } from './constants';
import { checkServiceability } from './address';
import { getUser as getUserService, addUser as addUserService } from '../services/user';
import { getConfig } from '../services/config';
import updateUserAction from './update-user';
import { APIError } from '../services/types';

export const updateUser = updateUserAction;

export const setUser = data => ({
  type: SET_USER,
  data
});

export const newUser = data => ({
  type: NEW_USER,
  data
});

export const setNewToken = data => ({
  type: SET_NEW_AUTH_TOKEN,
  data
});

export const setNewUser = () => newUser({ newUser: true });

export const addUser = ({ firstName, lastName }) => async dispatch => {
  try {
    await addUserService({ firstName, lastName });
    getUserService.clear();
    const user = await getUserService();
    dispatch(setUser(user));
    dispatch(newUser({ newUser: false, newUserErrorMessage: '' }));
    try {
      await getConfig();
    } catch (e) {
      console.log(e.message);
    }
  } catch (e) {
    if (e instanceof APIError) {
      dispatch(newUser({ newUserErrorMessage: e.message }));
    }
  }
};

export const getUser = () => async dispatch => {
  try {
    const user = await getUserService();
    return [
      dispatch(setUser(user)),
      dispatch(checkServiceability({ pincode: user.preferences.pincode }))
    ];
  } catch (e) {
    return [
      dispatch(setUser({}))
    ];
  }
};
