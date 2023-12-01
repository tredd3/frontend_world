import moment from "moment";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import base64enc from 'crypto-js/enc-base64';
import store from "../store"

export function requestIdGen(mobNo) {
  let dd = normalizeToTwoDigit(moment().date());
  let mm = normalizeToTwoDigit(moment().month());
  let hh = normalizeToTwoDigit(moment().hour());
  let minmin = normalizeToTwoDigit(moment().minute());
  let ss = normalizeToTwoDigit(moment().second());
  let rand = getRan(10);
  return `${mobNo}${dd}${mm}${hh}${minmin}${ss}${rand}`;
}

function normalizeToTwoDigit(val) {
  val = val.toString();
  if (val.length == 1) {
    return `0${val}`;
  } else if (val.length > 2) {
    return val.substring(0, 2);
  }
  return val;
}

export function getRan(n) {
  if (!n) n = 5;
  let rand = Math.round(Math.random() * Math.pow(10, n));
  if (rand.toString().length < n) {
    let restLength = n - rand.toString().length;
    let zeroes = (function () {
      let zero = "";
      for (var i = 0; i < restLength; i++) {
        zero += "0"
      }
      return zero
    })();
    rand = rand + zeroes;
  }
  return rand.toString();
}

export function getHmacKey(param1, param2, param3) {
  return param1 + param2 + param3;
}

export function getHmacData(key, value) {
  return base64enc.stringify(hmacSHA256(value, key));
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function isValidMobileNo(Number) {
  return (!isNaN(Number) && Number.length > 9);
}

export function isValidEmailId(emailId) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(emailId);
}

export function convertToEpoch(dateObject) {
  return Math.round(dateObject.getTime() / 1000)
}

export function getDateFromEpoch(ts) {
  return new Date(ts * 1000);
}

export function isUndefine(val) {
  if ((typeof val == "undefined") || val.trim() == "") {
    return true
  } else {
    return false
  }
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result)
    };
    reader.onerror = error => reject(error);
  });
}

export const getIndexOf = (searchArr, objKey, serachKey) => {
  let index = searchArr.findIndex(val => {
    return val[objKey] == serachKey
  })
  return index
}

export function formatTime(time) {
  let timeArray = time.split(":");
  console.log("Time arry is ")
  console.log(timeArray);
  let hour = timeArray[0];
  let min = timeArray[1];
  let formattedTime = "";
  if (hour > 12) {
    hour = hour - 12;
    formattedTime = hour + ":" + min + " pm";
  } else {
    formattedTime = hour + ":" + min + " am";
  }
  return formattedTime;
}

export function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  return `${day} ${months[month]} ${year}`;
}

export function decodeDate(date, gap) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  var map = new Map([
    [0, 31],
    [1, 28],
    [2, 31],
    [3, 30],
    [4, 31],
    [5, 30],
    [6, 31],
    [7, 31],
    [8, 30],
    [9, 31],
    [10, 30],
    [11, 31]
  ]);
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  if (gap === "30days") {
    let customDay, customMonth, customYear = year;
    if (day >= 30) {
      customDay = "01"
    } else {
      customMonth = month - 1;
      if (customMonth < 0) {
        customYear = year - 1;
        customMonth = 11;
      }
      customDay = map.get(customMonth) + day - 30;
    }

    return `${customDay}-${months[customMonth]}-${customYear}`
  } else if (gap === "6months") {
    let customMonth, customYear = year;
    if (month < 6) {
      customMonth = month + 7
      customYear = year - 1;
    } else {
      customMonth = month - 6;
    }
    return `${day}-${months[customMonth]}-${customYear}`
  } else {
    return `${day}-${months[month]}-${year}`
  }
}

// cart quantity helper
export function getProductQty(productSkuId) {
  let prdQtyObj = store.getState().cart.prdQtyObj;
  let prdIdArr = Object.keys(prdQtyObj);
  return prdIdArr.includes(productSkuId.toString()) ? prdQtyObj[productSkuId] : 0
}
