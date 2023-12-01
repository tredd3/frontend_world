import { START_FETCH, READY_APP, SUCCESS_FETCH, FAIL_FETCH, COMPLETE_AUTH, TOGGLE_SPINNER, TOGGLE_SNACKBAR, REMOVE_AUTH, CHANGE_ROUTE, TOGGLE_LOCATION } from '../actions/constants';

const initialState = {
  appReady: false,
  fetchingApi: false,
  fetchFail: false,
  showSpinner: true,
  spinnerText: "",
  snackBarStatus: false,
  snackBarText: "",
  snackBarType: "",
  authDone: false,
  currentRoute: "",
  locationDrawer: false
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case READY_APP:
      return Object.assign({}, state, {
        appReady: true
      });
    case START_FETCH:
      return { ...state, fetchingApi: true }

    case SUCCESS_FETCH:
      return { ...state, fetchingApi: false }

    case FAIL_FETCH:
      return { ...state, fetchingApi: false }

    case COMPLETE_AUTH:
      return Object.assign({}, state, {
        authDone: true
      });

    case TOGGLE_SPINNER:
      return { ...state, ...action.data }

    case TOGGLE_SNACKBAR:
      return { ...state, ...action.data }
    // return Object.assign({}, state, {
    //   snackBarStatus: action.data.show,
    //   toastObj: action.data.toastObj || Object.assign({}, initialState.toastObj)
    // });

    case TOGGLE_LOCATION:
      return { ...state, ...action.data }

    case REMOVE_AUTH:
      return Object.assign({}, initialState, {
        authDone: false,
      })

    case CHANGE_ROUTE:
      return Object.assign({}, state, {
        currentRoute: action.data.route,
      })

    default:
      return state;
  }
}
