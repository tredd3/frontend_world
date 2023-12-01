import { SET_USER, SET_NEW_AUTH_TOKEN } from '../actions/constants';

let initialState = {
  access_token: null,
  refresh_token: null,
  firstName: "",
  lastName: "",
  userId: 0,
  phoneNumber: '',
  login: false,
  xApiKey: null
}
initialState = JSON.parse(localStorage.getItem('user')) || initialState;

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.data }
    case SET_NEW_AUTH_TOKEN:
      return { ...state, ...action.data }
    default:
      return state;
  }
}
