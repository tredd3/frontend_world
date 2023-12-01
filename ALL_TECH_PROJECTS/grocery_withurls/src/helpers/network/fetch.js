import uuidV1 from 'uuid/v1';
import store from '../../store';
import {
  toggleSpinner,
  startFetch,
  successFetch,
  failFetch,
  toggleSnackBar
} from '../../actions/appState';
import { getRan } from '../utilities';
import {
  openApi, withDataApi, withStoreId, v2Apis, v3Apis
} from './api-routes';

let controller; let
  signal;

const getStoreId = () => {
  const { address } = store.getState().userAddress;
  if (address && address.storeId) return address.storeId;

  const placeOrderDataObj = sessionStorage.getItem('placeOrderDataObj');
  if (placeOrderDataObj) return JSON.parse(placeOrderDataObj).StoreId;
  return 0;
};

/**
 * Return a JSON Object for headers.
 * @param  {String} url     [Add some headers generically filtering out the url]
 * @param  {Array} headers [Array of headers as designed in ./headers.js file]
 * @return {Object}         [JSON object of headers returned]
 */
const formHeaders = (url, headers) => {
  // eslint-disable-next-line @typescript-eslint/camelcase, camelcase
  const { access_token, xApiKey } = store.getState().user;
  const normalHeaders = {
    'X-API-Key': process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_KEY : xApiKey,
    'Content-Type': 'application/json',
    'X-REQUEST-ID': uuidV1(),
    'app-name': 'RJIL_JioKart',
    // eslint-disable-next-line @typescript-eslint/camelcase, camelcase
    ...(!openApi.includes(url) && { Authorization: `Bearer ${access_token}` }),
    ...(withStoreId.includes(url) && { StoreId: getStoreId() })
  };

  return {
    ...normalHeaders,
    ...(headers.length && headers.reduce(
      (acc, headerItem) => ({ ...acc, [headerItem.header]: headerItem.value }),
      {}
    ))
  };
};

/**
 * Modify URL out of url parameters and query parameters
 * @param  {String} url    [The main url defined in api-routes file]
 * @param  {Object} params [This object contains two json objects, namely - urlParams and queryParams]
 * @return {String}        [Modified URL]
 */
function formUrl(url, params) {
  let newUrl = url;

  if (params && params.urlParams) {
    const paramKeys = Object.keys(params.urlParams);
    const paramKeysRegexp = paramKeys.map(key => new RegExp(`:${key}`));

    if (!paramKeysRegexp.every(keyReg => keyReg.test(url))) {
      throw new Error("URL PARAMS GIVEN DOESN'T MATCH THE URL SCHEMA");
    }

    paramKeysRegexp.forEach((keyReg, i) => {
      newUrl = newUrl.replace(keyReg, params.urlParams[paramKeys[i]]);
    });
  }

  if (params && params.queryParams) {
    newUrl = `${newUrl}?${Object.entries(params.queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')}`;
  }

  return newUrl;
}

const handleFetchErrors = fetchRes => new Promise((resolve, reject) => {
  if (fetchRes && fetchRes.Control && fetchRes.Control.Message) return reject(fetchRes);
  if (Object.keys(fetchRes).length === 0) return reject(new Error('Received empty data'));

  let code;

  if (fetchRes.errors) {
    fetchRes.errors.forEach(err => {
      code = err.code;
    });
  }

  if (fetchRes.error) {
    code = fetchRes.error;
  }

  if (fetchRes.Control && fetchRes.Control.Status === 0) {
    code = fetchRes.Control.Message;
  }

  if (code) {
    reject(code);
  }

  return null;
});

const getApiWithVersions = url => {
  if (v3Apis.includes(url)) {
    return '3.0';
  } if (v2Apis.includes(url)) {
    return 2.0;
  }
  return parseFloat(process.env.REACT_APP_API_VERSION);
};

const getRequestHeaders = url => ({
  DeviceId: '6cf35d17989d3fbe',
  RequestTime: new Date().getTime(),
  RequestId: getRan(10),
  Version: getApiWithVersions(url),
  Product: parseFloat(process.env.REACT_APP_PRODUCT_VERSION)
});

const getParsedBody = (body, url) => {
  const requestBody = {
    Request: {
      Header: getRequestHeaders(url),
      Body: body || {}
    }
  };

  return JSON.stringify(withDataApi.includes(url) ? { Data: requestBody } : requestBody);
};

/**
 * This function calls the fetch api on a given url and returns promise
 * @param  {String} url       The url to hit
 * @param  {Object} params    Param contains two properties - queryParams and urlParams.
 * @param  {Object} overrides Overrides contains properties - header, method
 * @param  {boolean} cancelFetch If true, the previous fetch request is cancelled
 * @return {Promise}          Promise of type JSON is returned
 */
export const fetchApi = async requestObject => {
  const {
    url,
    params,
    body,
    overrides,
    cancelFetch,
    showSnackbar = true
  } = requestObject;
  try {
    if (controller && cancelFetch) {
      controller.abort();
    }
    if ('AbortController' in window) {
      controller = new window.AbortController();
      signal = controller.signal;
    }
    const newUrl = params ? formUrl(url, params) : url;

    const reqBody = getParsedBody(body, url);
    const reqObj = {
      method: overrides && overrides.method ? overrides.method : 'POST',
      headers: formHeaders(url, (overrides && overrides.headers) || [], reqBody),
      cache: 'default',
      mode: 'cors',
      body: reqBody,
      signal
    };

    store.dispatch(toggleSpinner(true));
    store.dispatch(startFetch());

    const fetchProcess = await fetch(newUrl, reqObj);
    // console.log("FetchProcess: ", fetchProcess);
    const fetchResult = await fetchProcess.json();
    store.dispatch(toggleSpinner(false));

    if (fetchResult.Control && fetchResult.Control.Status === 0) {
      store.dispatch(failFetch());
      showSnackbar && store.dispatch(toggleSnackBar(true, fetchResult.Control.Message, 'error'));
    } else if (fetchResult.Control && fetchResult.Control.Status === 1) {
      store.dispatch(successFetch());
    }

    let fetchResultCleaned;
    if (
      fetchProcess.ok
      && fetchProcess.status === 200
      && fetchResult.Control
      && fetchResult.Control.Status === 1
    ) {
      fetchResultCleaned = fetchResult;
    } else {
      fetchResultCleaned = await handleFetchErrors(fetchResult);
    }
    return fetchResultCleaned;
  } catch (e) {
    store.dispatch(failFetch());
    store.dispatch(toggleSpinner(false));
    if (e.name === 'AbortError') {
      return false;
    }
    if (typeof e === 'string') {
      throw new Error(e);
    } else {
      throw e;
    }
  }
};
