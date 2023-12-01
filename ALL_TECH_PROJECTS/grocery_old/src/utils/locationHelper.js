import {fetchApi} from '../helper/network/fetch';
import API_ROUTES from '../helper/network/api-routes';

export const fetchUserLocation = () => {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        var startPos;
        let geoSuccess = (position) => {
          startPos = position;
          console.log("LAT: " + startPos.coords.latitude + " LNG: " + startPos.coords.longitude);
          let lat = startPos.coords.latitude;
          let lng = startPos.coords.longitude;
          resolve({lat, lng});
        }
        let geoError = (e) => {
          console.log('Error occurred. Error code: ' + e.code);
          let msg;
          switch (e.code) {
            case 0:
              msg = "Unable to access location";
              break;
            case 1:
              msg = "Location permission denied";
              break;
            case 2:
              msg = "Location unavailable from location provider";
              break;
            case 3:
              msg = "Timed out";
              break;
            default:
              msg = "Unable to access location";
          }
          reject(msg);
        }
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
      }
      else{
        reject("Location access not supported by browser.")
      }
  })
}

export const getPostalCode = (dataArr) => {
  let postalCodeArr = dataArr.filter(obj => {
	   return obj.types.includes("postal_code");
  })
  return postalCodeArr[0];
}

// export const checkPincodeServiceability = (pincode) => {
//   return new Promise((resolve, reject) => {
//     fetchApi({
//       url: API_ROUTES.checkServiceability,
//       body:{pincode}
//     })
//     .then(response => {
//       debugger
//     })
//     .catch(error => {
//
//     })
//   })
// }
