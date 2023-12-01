import {
  START_FETCH,
  SUCCESS_FETCH,
  FAIL_FETCH,
  COMPLETE_AUTH,
  TOGGLE_SPINNER,
  TOGGLE_CONFIRM,
  TOGGLE_ALERT,
  TOGGLE_TOAST,
  REMOVE_AUTH,
  SET_FULL_ORDER,
  SET_MERCHANT,
  SET_USER,
  READY_APP,
  CHANGE_ROUTE,
  SET_DEVICE_DATA,
  SET_HEADER,
  RESET_HEADER,
  SET_ELIPISIS,
  TOGGLE_ELIPISIS,
  SET_CUSTOMERID,
  IS_SOMETHING_WRONG,
  TOGGLE_SNACKBAR,
  TOGGLE_LOCATION
} from "../actions/constants";

const readyApp = function () {
  return {
    type: READY_APP
  }
}

export const startFetch = () => {
  return {
    type: START_FETCH
  }
}

export const successFetch = () => {
  return {
    type: SUCCESS_FETCH
  }
}

export const failFetch = () => {
  return {
    type: FAIL_FETCH
  }
}

export const completeAuth = () => {
  return {
    type: COMPLETE_AUTH
  }
}

export const toggleSpinner = (show) => {
  return {
    type: TOGGLE_SPINNER,
    data: { showSpinner: show }
  }
}

export const toggleLocationDrawer = (show, callback) => {
  return {
    type: TOGGLE_LOCATION,
    data: { locationDrawer: show, checkServiceability: callback }
  }
}

export const toggleSnackBar = (show, text = "", type = "") => {
  return {
    type: TOGGLE_SNACKBAR,
    data: { snackBarStatus: show, snackBarText: text, snackBarType: type }
  }
}


// export const toggleToast = function(show: boolean, toastObj: toastObjType) {
//   return {
//     type: TOGGLE_TOAST,
//     data: {show, toastObj}
//   }
// }


export const changeRoute = (routerHistory, path) => {
  routerHistory.push(path);
  return {
    type: CHANGE_ROUTE,
    data: {
      route: path
    }
  }
}


// export const toggleIsSomethingWrong = (isSomethingWrong) => {
//   return{
//     type: IS_SOMETHING_WRONG,
//     isSomethingWrong
//   }
// }
