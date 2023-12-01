import {SET_LAT_LNG, ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS_LIST, SELECT_ADDRESS, CLEAR_DEFAULT, ADDRESS_LIST_SET_DEFAULT} from '../actions/constants';


const cleanAddr = {
  "addressId": 0,
  "userId": null,
  "firstName": "",
  "storeId": 0,
  "storeName": "",
  "address": "",
  "addressLine1": "",
  "addressLine2": "",
  "addressLine3": "",
  "cityId": null,
  "cityName": "",
  "stateId": null,
  "stateName": "",
  "countryId": null,
  "countryName": "",
  "latitude": null,
  "longitude": null,
  "pincode": null,
  "isDefault": false,
  "addressType": null,
  "addedDate": "",
  "lastUpdatedDate": "",
  "active": null,
  "phoneNumber": null
};
const address = JSON.parse(localStorage.getItem('defaultAddress')) || cleanAddr;
const initialState = {
  address,
  addresses:[]
}

export default function userAddress(state = initialState , action) {
  switch (action.type) {
    case SET_LAT_LNG:
      return {...state,
        address:{
          ...state.address,
          latitude: action.data.lat,
          longitude: action.data.lng,
          pincode: action.data.pincode
        }
      }

    case SELECT_ADDRESS:
      return {...state, address: action.data}
    case CLEAR_DEFAULT:
      return {...state, address: cleanAddr}
    case ADD_ADDRESS:
      return {...state, addresses:[...state.addresses, action.data]}
    case REMOVE_ADDRESS:
      return {...state, addresses:action.data}
    case ADDRESS_LIST_SET_DEFAULT:
      return {...state, addresses:action.data}
    case UPDATE_ADDRESS_LIST:
      return {...state, addresses:action.data}

    default:
      return state;
  }
}
