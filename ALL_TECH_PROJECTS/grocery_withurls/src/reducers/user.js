import {
  SET_USER, NEW_USER, SET_NEW_AUTH_TOKEN, ORDER_RATED
} from '../actions/constants';

let initialState = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  access_token: null,
  // eslint-disable-next-line @typescript-eslint/camelcase
  refresh_token: null,
  firstName: '',
  lastName: '',
  userId: 0,
  phoneNumber: '',
  login: false,
  xApiKey: null,
  newUser: false,
  newUserErrorMessage: '',
  orderRated: false
};
const placeOrderDataObj = sessionStorage.getItem('placeOrderDataObj');
let sessionUser = null;
if (placeOrderDataObj) {
  sessionUser = JSON.parse(placeOrderDataObj).user;
}
initialState = sessionUser || initialState;

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.data };
    case SET_NEW_AUTH_TOKEN:
      return { ...state, ...action.data };
    case NEW_USER:
      return { ...state, ...action.data };
    case ORDER_RATED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
