import { SET_USER } from './constants';
import { getUser as getUserService, updateUser as updateUserService } from '../services/user';

const setUser = data => ({
  type: SET_USER,
  data
});

export default data => async dispatch => {
  await updateUserService(data);
  return dispatch(setUser(await getUserService()));
};
