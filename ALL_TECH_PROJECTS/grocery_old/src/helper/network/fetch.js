import API_ROUTES from './api-routes'
import store from '../../store'
import {
  toggleSpinner,
  startFetch,
  toggleSnackBar,
  successFetch,
  failFetch
} from '../../actions/appState'
import {
  requestIdGen,
  getRan,
  getHmacKey,
  getHmacData
} from '../utilites'
import {
  openApi,
  withDataApi,
  withStoreId
} from './api-routes'
import uuidV1 from 'uuid/v1'
import { getNewAccessToken } from '../../actions/user'

let getMethod = url => {
  if (0) {
    return 'GET'
  } else if (0) {
    return 'PUT'
  } else if (0) {
    return 'DELETE'
  } else {
    return 'POST'
  }
}

// export let cancelFetchSub: Subject<string> = new Subject();

// whole fetch actions are cached due to access token expiration.
// So hyperlocal will wait for access token to get updated from app and accordingly call them
let cachedFetchActions = {}
let hasAccessTokenFailed = false
let accessTokenFailureConveyed = false
let controller, signal

function getCouponHeaders() {
  let timeAsNum = new Date().getTime()
  // let {deviceData} = store.getState().appState.couponMerchantData
  return {
    DeviceId: '6cf35d17989d3fbe',
    RequestTime: timeAsNum,
    RequestId: getRan(10),
    Version: parseFloat(process.env.API_VERSION),
    Product: parseFloat(process.env.PRODUCT_VERSION)
  }
}

/**
 * Return a JSON Object for headers.
 * @param  {String} url     [Add some headers generically filtering out the url]
 * @param  {Array} headers [Array of headers as designed in ./headers.js file]
 * @return {Object}         [JSON object of headers returned]
 */
function formHeaders(url, headers, reqBody) {
  // let {userData, deviceData} = store.getState().user
  let {
    access_token,
    phoneNumber,
    xApiKey
  } = store.getState().user
  console.log("|||| access_token |||| " + access_token);
  let timeAsNum = new Date().getTime()
  let randomNo = getRan(10),
    requestId = uuidV1()
  // let phoneNumber = userData.phoneNumber.replace("+91", "").trim();
  // let hmacKey = getHmacKey(userData.uid, randomNo, phoneNumber);
  // console.log("hmacKey" + hmacKey)
  // let hmacShaData = getHmacData(hmacKey, reqBody);
  // let authToken = userData.accessToken.replace("Bearer", "").trim();
  // console.log('<<FORMING NORMAL HEADERS FOR FETCH REQUEST>>')
  var normalHeaders = {
    'X-API-Key': process.env.APP_TYPE == "web" ? process.env.API_KEY : xApiKey,
    'Content-Type': 'application/json',
    'X-REQUEST-ID': requestId,
    // 'X-loginid': phoneNumber,
    'app-name': 'RJIL_JioKart',
    // "RandomNo": randomNo,
    // "Data": hmacShaData,
    // "Content-Type": "application/x-www-form-urlencoded",
    // "StoreId": userData.storeId
  }
  if (!openApi.includes(url)) { normalHeaders.Authorization = 'Bearer ' + access_token }
  if (withStoreId.includes(url)) {
    normalHeaders.Storeid =
      store.getState().userAddress.address &&
        store.getState().userAddress.address.storeId
        ? store.getState().userAddress.address.storeId
        : 0
  }
  if (process.env.APP_ENV === 'LOCAL') normalHeaders['X-loginid'] = phoneNumber

  if (headers.length) {
    return Object.assign(
      normalHeaders,
      headers.reduce(
        (acc, headerItem) =>
          Object.assign(acc, {
            [headerItem.header]: headerItem.value
          }), {}
      )
    )
  } else {
    return normalHeaders
  }
}

/**
 * Modify URL out of url parameters and query parameters
 * @param  {String} url    [The main url defined in api-routes file]
 * @param  {Object} params [This object contains two json objects, namely - urlParams and queryParams]
 * @return {String}        [Modified URL]
 */
function formUrl(url, params) {
  let newUrl = url
  let error = null
  if (params && params.urlParams) {
    let paramKeys = Object.keys(params.urlParams)
    let paramKeysRegexp = paramKeys.map(key => new RegExp(':' + key))
    let containsAllParams = paramKeysRegexp.every(keyReg => keyReg.test(url))
    if (containsAllParams) {
      paramKeysRegexp.forEach((keyReg, i) => {
        newUrl = params ?
          newUrl.replace(keyReg, params.urlParams[paramKeys[i]]) :
          url
      })
    } else {
      throw new Error("URL PARAMS GIVEN DOESN'T MATCH THE URL SCHEMA")
    }
  }
  if (params && params.queryParams) {
    let queryParamsStr = Object.keys(params.queryParams)
      .map(function (k) {
        return params
          ? encodeURIComponent(k) +
          '=' +
          encodeURIComponent(params.queryParams[k])
          : null
      })
      .join('&')
    newUrl = newUrl + '?' + queryParamsStr
  }
  return newUrl
}

/**
 * This function calls the fetch api on a given url and returns promise
 * @param  {String} url       The url to hit
 * @param  {Object} params    Param contains two properties - queryParams and urlParams.
 * @param  {Object} overrides Overrides contains properties - header, method
 * @param  {boolean} cancelFetch If true, the previous fetch request is cancelled
 * @return {Promise}          Promise of type JSON is returned
 */
export async function fetchApi(requestObject) {
  let {
    url,
    params,
    processActions,
    body,
    overrides,
    cancelFetch
  } = requestObject
  try {
    if (controller && cancelFetch) {
      controller.abort()
    }
    if ('AbortController' in window) {
      controller = new window.AbortController()
      signal = controller.signal
    }
    var newUrl = params ? formUrl(url, params) : url
    // console.log('Trying to FETCH for: ', url)
    let reqBody = getParsedBody(body, url)
    let newHeaders = await formHeaders(
      url,
      overrides && overrides.headers ? overrides.headers : [],
      reqBody
    )
    let newMethod =
      overrides && overrides.method ? overrides.method : getMethod(url)
    var reqObj = {
      method: newMethod,
      headers: newHeaders,
      cache: 'default',
      mode: 'cors',
      body: reqBody,
      signal: signal
    }
    console.log("||||Request Object|||| " + JSON.stringify(reqObj));
    store.dispatch(toggleSpinner(true))
    store.dispatch(startFetch())

    // has Token expired ? refresh and then hit api , alway keep the person authenticated. DAMN
    if( store.getState().user && (Date.now() > store.getState().user.expiresAt )) {
      // refresh tokens first and then hit fetch you
      // let before = Date.now();
      await store.dispatch(getNewAccessToken())
      // console.log(Date.now() - before);
    }

    let fetchProcess = await fetch(newUrl, reqObj)
    // console.log("FetchProcess: ", fetchProcess);
    if (
      typeof fetchProcess === 'string' &&
      (fetchProcess == url || fetchProcess === 'any')
    ) {
      throw 'Fetch cancelled'
    }
    var fetchResult = await fetchProcess.json()
    console.log("|||| fetchResult |||| " + JSON.stringify(fetchResult));
    store.dispatch(toggleSpinner(false))
    if (fetchResult.Control && fetchResult.Control.Status === 0 ) {
      store.dispatch(failFetch())
      store.dispatch(toggleSpinner(false))
    } else if (fetchResult.Control && fetchResult.Control.Status === 1) {
      store.dispatch(successFetch())
      store.dispatch(toggleSpinner(false))
    }
    let fetchResultCleaned
    if (
      fetchProcess.ok &&
      fetchProcess.status === 200 &&
      fetchResult.Control &&
      fetchResult.Control.Status == 1
    ) {
      fetchResultCleaned = fetchResult
    } else {
      fetchResultCleaned = await handleFetchErrors(fetchResult, newUrl, reqObj)
    }
    return fetchResultCleaned
  } catch (e) {
    store.dispatch(failFetch())
    store.dispatch(toggleSpinner(false))
    // console.log("INSIDE FETCH ERROR. LOOKING ERROR IN 3 WAYS:");
    // console.log("Error>> ", e);
    // console.log(e.message);
    // console.log(JSON.stringify(e));
    if (e.name === 'AbortError') {
      // console.log('Aborting');
      return
    }
    // console.log('Error in url >>>>> ' + url + " " + e.message);
    //store.dispatch(toggleSnackBar(true, e.toString(), 'error'))
    // notifyObjNew.message = e.message || "Something went wrong. Please try again later."
    if (typeof e === 'string') {
      throw new Error(e)
    } else {
      throw e
    }
  }
}

function handleFetchErrors(fetchRes, newUrl, reqObj) {
  // console.log("<INSIDE FETCH RESPONSE ERROR HANDLER Fetch response is>: " + JSON.stringify(fetchRes));
  return new Promise((resolve, reject) => {
    let code,
      errStrArr = []
    if (fetchRes &&  fetchRes.Control && fetchRes.Control.Message) {
      reject(fetchRes)
    }
    if (Object.keys(fetchRes).length === 0) {
      reject(new Error('Received empty data'))
    }
    if (fetchRes.errors) {
      fetchRes.errors.forEach((err, key) => {
        code = err.code
        if (err.details) {
          errStrArr.push(err.reason)
        }
      })
    }
    if (fetchRes.error) {
      code = fetchRes.error
      errStrArr.push(fetchRes.error.reason)
    }
    if (fetchRes.Control && fetchRes.Control.Status == 0) {
      code = fetchRes.Control.Message
      errStrArr.push('Error')
    }
    if (code) {
      reject(code)
    }
  })
}

function getParsedBody(body, url) {
  let newBody = {}
  if (body) {
    newBody = Object.assign(newBody, body)
  }
  let couponHeaders = getCouponHeaders()
  let fullReqBody = {
    Header: couponHeaders,
    Body: newBody
  }
  if (withDataApi.includes(url)) {
    return JSON.stringify({
      Data: {
        Request: fullReqBody
      }
    })
  } else {
    return JSON.stringify({
      Request: fullReqBody
    })
  }
}
