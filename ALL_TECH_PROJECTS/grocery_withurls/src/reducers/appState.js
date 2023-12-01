import {
  START_FETCH, READY_APP, SUCCESS_FETCH, FAIL_FETCH, COMPLETE_AUTH,
  TOGGLE_SPINNER, TOGGLE_SNACKBAR, REMOVE_AUTH, CHANGE_ROUTE, TOGGLE_LOCATION,
  TOGGLE_HAMBURGER, ALERT_BOX
} from '../actions/constants';

const initialState = {
  appReady: false,
  fetchingApi: false,
  fetchFail: false,
  showSpinner: false,
  spinnerText: '',
  snackBarStatus: false,
  snackBarText: '',
  snackBarType: '',
  authDone: false,
  currentRoute: '',
  locationDrawer: false,
  hamburger: false,
  openAlertBox: false,
  alertBoxText: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READY_APP:
      return { ...state, appReady: true };
    case START_FETCH:
      return { ...state, fetchingApi: true };

    case SUCCESS_FETCH:
      return { ...state, fetchingApi: false };

    case FAIL_FETCH:
      return { ...state, fetchingApi: false };

    case COMPLETE_AUTH:
      return { ...state, authDone: true };

    case TOGGLE_SPINNER:
      return { ...state, ...action.data };

    case TOGGLE_SNACKBAR:
      return { ...state, ...action.data };

    case TOGGLE_LOCATION:
      return { ...state, ...action.data };

    case REMOVE_AUTH:
      return { ...initialState, authDone: false };

    case CHANGE_ROUTE:
      return { ...state, currentRoute: action.data.route };
    case TOGGLE_HAMBURGER:
      return { ...state, hamburger: action.val };
    case ALERT_BOX:
      return { ...state, ...action.data };

    default:
      return state;
  }
};
