import {
  START_FETCH,
  SUCCESS_FETCH,
  FAIL_FETCH,
  COMPLETE_AUTH,
  TOGGLE_SPINNER,
  TOGGLE_SNACKBAR,
  TOGGLE_HAMBURGER,
  TOGGLE_LOCATION,
  ALERT_BOX
} from './constants';

export const startFetch = () => ({ type: START_FETCH });
export const successFetch = () => ({ type: SUCCESS_FETCH });
export const failFetch = () => ({ type: FAIL_FETCH });
export const completeAuth = () => ({ type: COMPLETE_AUTH });

export const toggleSpinner = show => ({
  type: TOGGLE_SPINNER,
  data: { showSpinner: show }
});

export const toggleLocationDrawer = (show, callback) => ({
  type: TOGGLE_LOCATION,
  data: { locationDrawer: show, checkServiceability: callback }
});

export const toggleSnackBar = (snackBarStatus, snackBarText = '', snackBarType = '') => ({
  type: TOGGLE_SNACKBAR,
  data: { snackBarStatus, snackBarText, snackBarType }
});

export const alertBox = data => ({
  type: ALERT_BOX,
  data
});

export const toggleHamburger = val => ({
  type: TOGGLE_HAMBURGER,
  val
});
