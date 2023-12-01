import {
  SET_LAT_LNG, ADD_ADDRESS, UPDATE_ADDRESS_LIST,
  SELECT_ADDRESS, ADDRESS_LIST_SET_DEFAULT, SET_LAT_LNG_ADDRESSES
} from '../actions/constants';

const initialAddress = {
  addressId: 0,
  userId: null,
  firstName: '',
  storeId: 0,
  storeName: '',
  address: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  cityId: null,
  cityName: '',
  stateId: null,
  stateName: '',
  countryId: null,
  countryName: '',
  latitude: null,
  longitude: null,
  pincode: null,
  isDefault: false,
  addressType: null,
  addedDate: '',
  lastUpdatedDate: '',
  active: null,
  phoneNumber: null
};

const initialState = {
  address: initialAddress,
  addresses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LAT_LNG:
      return {
        ...state,
        address: {
          ...state.address,
          latitude: action.data.lat,
          longitude: action.data.lng,
          pincode: action.data.pincode
        }
      };
    case SET_LAT_LNG_ADDRESSES:
      return {
        ...state,
        addresses: action.data
      };
    case SELECT_ADDRESS:
      return { ...state, address: action.data };
    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.data] };
    case ADDRESS_LIST_SET_DEFAULT:
      return { ...state, addresses: action.data };
    case UPDATE_ADDRESS_LIST:
      return { ...state, addresses: action.data };

    default:
      return state;
  }
};
