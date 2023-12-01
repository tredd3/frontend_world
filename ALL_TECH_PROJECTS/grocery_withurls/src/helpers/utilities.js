import store from '../store';
import { queryStringToObject } from './functional';

const LIFTED_SNACKBAR_ROUTES = ['/', '/static/jiokart/index.html',
  '/index.html', '/static/jiomart/index.html', '/static/jiomart/', '/static/jiomart/cart/addresses'];

export function getRan(n = 5) {
  let rand = Math.round(Math.random() * 10 ** n);
  if (rand.toString().length < n) {
    const restLength = n - rand.toString().length;
    const zeroes = (() => {
      let zero = '';
      for (let i = 0; i < restLength; i += 1) {
        zero += '0';
      }
      return zero;
    })();
    rand += zeroes;
  }
  return rand.toString();
}

export const numberOfDigits = num => Math.floor(Math.log10(num) + 1);

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;
  return function debounceInner() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function getDate(dateObj) {
  const date = (`0${dateObj.getDate()}`).slice(-2);
  const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
  const year = dateObj.getFullYear();
  return `${year}-${month}-${date}`;
}

export function getDateFromEpoch(ts) {
  const utcSeconds = Math.floor(Number(ts) / 1000);
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  return getDate(d);
}

export function formatTime(time) {
  const timeArray = time.split(':');
  let hour = timeArray[0];
  const min = timeArray[1];
  let formattedTime = '';
  if (hour > 12) {
    hour -= 12;
    formattedTime = `${hour}:${min} pm`;
  } else {
    formattedTime = `${hour}:${min} am`;
  }
  return formattedTime;
}

export function formatDate(date, monthTitleCase = false) {
  const od = date.split(' ')[0].split('-');
  const day = od[2];
  const month = Number(od[1]) - 1;
  const year = od[0];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];
  if (monthTitleCase) {
    return `${day} ${months[month].replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())} ${year}`;
  }
  return `${day} ${months[month]} ${year}`;
}

export function decodeDate(date, gap) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const map = new Map([
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
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];
  if (gap === '30days') {
    let customDay; let customMonth; let
      customYear = year;
    if (day >= 30) {
      customDay = '01';
    } else {
      customMonth = month - 1;
      if (customMonth < 0) {
        customYear = year - 1;
        customMonth = 11;
      }
      customDay = map.get(customMonth) + day - 30;
    }

    return `${customDay}-${months[customMonth]}-${customYear}`;
  } if (gap === '6months') {
    let customMonth; let
      customYear = year;
    if (month < 6) {
      customMonth = month + 7;
      customYear = year - 1;
    } else {
      customMonth = month - 6;
    }
    return `${day}-${months[customMonth]}-${customYear}`;
  }
  return `${day}-${months[month]}-${year}`;
}

// cart quantity helper
export function getProductQty(productSkuId) {
  const { prdQtyObj } = store.getState().cart;
  const prdIdArr = Object.keys(prdQtyObj);
  return prdIdArr.includes(productSkuId.toString()) ? prdQtyObj[productSkuId] : 0;
}

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 1;// "Windows Phone"
  }

  if (/android/i.test(userAgent)) {
    return 2;// "Android"
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 3;// "iOS"
  }

  return 4; // unknown
}

export const getRedirectUrl = querySearch => {
  const queryParam = new URLSearchParams(querySearch);

  if (queryParam.get('from') === 'checkout') {
    return `/account/select-address${querySearch}`;
  }
  return `/account/addresses${querySearch}`;
};

export const getUrlParams = param => {
  const search = decodeURIComponent(window.location.search);
  const searchParam = new URLSearchParams(search);
  return searchParam.get(param);
};

export const updateSelectedFilters = (selectedFilters, filter, canSelectMultipleValues) => {
  const { id, value, checked } = filter;
  const updatedFilters = { ...selectedFilters };

  if (!checked) {
    if (updatedFilters[id]) {
      updatedFilters[id] = updatedFilters[id].filter(filterValue => filterValue !== value);

      if (!updatedFilters[id].length) {
        delete updatedFilters[id];
      }
    }
  } else if (canSelectMultipleValues) {
    if (!updatedFilters[id]) {
      updatedFilters[id] = [];
    }

    updatedFilters[id].push(value);
  } else {
    updatedFilters[id] = [value];
  }

  return updatedFilters;
};

export const parseQSForFiltersAndSort = (baseFilters, queryString, excludeKeysFromQS = []) => {
  const filter = { ...baseFilters, '@type': 'Filter' };
  const { sort: sortObj, ...queryFilterObj } = queryStringToObject(queryString);
  excludeKeysFromQS.forEach(keyName => delete queryFilterObj[keyName]);

  Object.keys(queryFilterObj).forEach(keyName => {
    filter[keyName] = queryFilterObj[keyName];
  });

  let sort = {
    _score: 'desc',
    isFc: 'desc',
    isUKA: 'desc'
  };

  try {
    if (sortObj && sortObj[0]) {
      sort = { ...sort, ...JSON.parse(sortObj[0]) };
    }
  } catch (e) {
    // Do nothing if sort object isn't parseable
  }

  return { filter, sort };
};

export const parseQSForAppliedFiltersCount = (filters, queryString) => {
  let count = 0;
  const { sort, ...queryObj } = queryStringToObject(queryString);

  filters.forEach(filter => {
    count = queryObj[filter.id] ? count + queryObj[filter.id].length : count;
  });

  if (sort && sort[0]) {
    count += 1;
  }

  return count;
};

export const truncateWithEllipsis = text => ((text && text !== null && text.length > 10)
  ? (`${(text).substring(0, 9)}…`)
  : text);

export const shouldLiftSnackbar = () => (LIFTED_SNACKBAR_ROUTES.includes(window.location.pathname) && getMobileOperatingSystem() !== 3);

const liftedRoutes = ['/', '/static/jiokart/index.html',
  '/index.html', '/static/jiomart/index.html', '/static/jiomart/', '/static/jiomart/cart/addresses'];

export const getBottomOffset = () => (liftedRoutes.includes(window.location.pathname)
&& getMobileOperatingSystem() !== 3 ? 55 : 0);

export const trimLowerCase = value => (value ? (value.replace(/ /g, '').toLowerCase() || '') : '');

export const setFromMyJioSearch = () => {
  if (getUrlParams('myjiosearch')) {
    sessionStorage.setItem('myjiosearch', true);
  }
};
export const isFromMyJioSearch = () => sessionStorage.getItem('myjiosearch');

export const removeFromMyJioSearch = () => sessionStorage.removeItem('myjiosearch');

