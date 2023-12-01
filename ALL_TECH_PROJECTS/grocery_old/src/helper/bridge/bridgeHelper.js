import { AppToWebObs, WebToAppObs, AppToWebIntent, WebToAppIntent } from './appBridge';
import { setUser, addUser, getUser } from '../../actions/user';
import { setLatLngPin } from "../../actions/address"
import store from '../../store';
import { getNewAccessToken } from '../../actions/user'
var google = window.google;
//var latlng = new google.maps.LatLng(19.0630, 73.0700);
// This is making the Geocode request
// var geocoder = new google.maps.Geocoder();
// geocoder.geocode({ 'latLng': latlng }, function (results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//     console.log(results)
//     const len = results[0].address_components.length;
//     const pincode = results[0].address_components[len - 1].long_name
//     store.dispatch(setLatLngPin(19.0630, 73.0700, pincode))
//     debugger;
//   }
// });
export const bridgeHelper = (datObj) => {
  return new Promise((resolve, reject) => {
    AppToWebObs.subscribe((intentData) => {
      if (intentData.type == AppToWebIntent.sendAccessToken) {
        const { access_tokens, refresh_token, xApiKey } = JSON.parse(localStorage.getItem('user') || "{}")
        localStorage.clear();
        let accessTokenObj = {
          "access_tokens": "58533e84-97d4-47a5-b763-533ee2c3fc11",
          "refresh_token": "03c84f6b-a33f-4a4b-9856-74e6658f23bf",
          "refreshTokenUrl": "https://api.jiomoney.com/jm/auth/oauth/v2/token",
          "dataSetOne": "l7xxd82dd824f0d14fbfb4616cd49205d5de",
          "dataSetTwo": "l7xxd82dd824f0d14fbfb4616cd49205d5de",
          "expires_in": "3600"
        }
        //let { access_tokens, refresh_token, dataSetOne, expires_in } = accessTokenObj;
        console.log('|||| bridgeHelper ||||' + JSON.stringify(intentData.data));
        store.dispatch(setUser({ access_token: accessTokenObj.access_tokens, refresh_token: accessTokenObj.refresh_token, login: true, xApiKey: accessTokenObj.dataSetOne, expiresAt: Date.now() + (accessTokenObj.expires_in * 1000) }))
        //store.dispatch(getNewAccessToken())
        store.dispatch(getUser(datObj))
        console.log(">>>>>>>>>>> inside sendAccessToken helper >>>>>>>>>>>");
        resolve(true);
      }
      if (intentData.type == AppToWebIntent.sendAdParams) {
        var { latitude, longitude } = intentData.data;
        var latlng = new google.maps.LatLng(latitude, longitude);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const len = results[0].address_components.length;
            const pincode = results[0].address_components[len - 1].long_name
            store.dispatch(setLatLngPin(latitude, longitude, pincode))
          }
        });
      }
    });

    // ask App for accessToken
    let getAccessToken = {
      getAccessToken: true
    }
    let readyObjIntent = {
      type: WebToAppIntent.accessToken,
      data: getAccessToken
    }
    WebToAppObs.next(JSON.stringify(readyObjIntent));
  })
}
