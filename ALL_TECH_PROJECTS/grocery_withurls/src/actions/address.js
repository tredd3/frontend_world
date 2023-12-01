import { geocodeByAddress } from 'react-places-autocomplete';
import {
  SET_LAT_LNG, ADD_ADDRESS, UPDATE_ADDRESS_LIST,
  ADDRESS_LIST_SET_DEFAULT, SELECT_ADDRESS, SET_LAT_LNG_ADDRESSES
} from './constants';
import { fetchApi } from '../helpers/network/fetch';
import API_ROUTES from '../helpers/network/api-routes';
import { getUserId } from '../helpers/makeApiBody';
import { toggleSnackBar, alertBox } from './appState';
import {
  getAddresses, getDefaultAddress, addAddress as addAddressService,
  deleteAddress as deleteAddressService, updateAddress as updateAddressService,
  setDefaultAddress as setDefaultAddressService,
  // eslint-disable-next-line camelcase, @typescript-eslint/camelcase
  DEPRECATED_convertAddressToAPIAddress
} from '../services/address';
import updateUser from './update-user';
import { getUser, updateUser as updateUserService } from '../services/user';

const reverseGeoCode = geocode => {
  const lat = geocode[0].geometry.location.lat();
  const lng = geocode[0].geometry.location.lng();
  const latlng = new window.google.maps.LatLng(lat, lng);
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(status);
      } else {
        resolve({ data: results, lat, lng });
      }
    });
  });
};

export const checkService = pincode => fetchApi({
  url: API_ROUTES.checkServiceability,
  body: { pincode }
});

export const setLatLngPin = (lat, lng, pincode, storeId) => ({
  type: SET_LAT_LNG,
  data: {
    lat, lng, pincode, storeId
  }
});

export const setLatLngAddresses = obj => ({
  type: SET_LAT_LNG_ADDRESSES,
  data: obj
});

export const addAddress = address => ({
  type: ADD_ADDRESS,
  data: address
});

export const updateAddressList = addressArr => ({
  type: UPDATE_ADDRESS_LIST,
  data: addressArr
});

export const setDefaultAddress = data => ({
  type: ADDRESS_LIST_SET_DEFAULT,
  data
});

export const selectAddr = address => ({
  type: SELECT_ADDRESS,
  data: address
});

export const selectAddress = id => async dispatch => {
  const addresses = await getAddresses();

  const selectedAddress = addresses.find(address => address.id === id);
  if (!selectedAddress) throw new Error('Could not find address');
  const updatedAddresses = addresses.map(address => ({
    ...address, isDefault: (address.addressId === id)
  }));
  const {
    latitude, longitude, pincode, cityName, storeId
  } = selectedAddress;
  await setDefaultAddressService(id);
  await updateUserService({
    lat: latitude, lng: longitude, pincode, city: cityName, storeId
  });
  dispatch(selectAddr(DEPRECATED_convertAddressToAPIAddress({ ...selectedAddress, isDefault: true })));
  dispatch(setDefaultAddress(updatedAddresses.map(DEPRECATED_convertAddressToAPIAddress)));
};

export const getAddress = () => async dispatch => {
  const addresses = await getAddresses();
  dispatch(updateAddressList(addresses.map(DEPRECATED_convertAddressToAPIAddress)));
  const defaultAddress = await getDefaultAddress();
  if (defaultAddress) { dispatch(selectAddr(DEPRECATED_convertAddressToAPIAddress(defaultAddress))); }
};

export const getCity = pincode => dispatch => geocodeByAddress(`${pincode}`)
  .then(reverseGeoCode)
  .then(res => {
    let cityName = ''; let regionName = ''; let
      countryName = '';
    const components = res.data[0].address_components;
    // eslint-disable-next-line no-restricted-syntax
    for (const component of components) {
      if (component.types[0] === 'administrative_area_level_2') { if (cityName === '') cityName = component.long_name; }
      if (component.types[0] === 'locality') { cityName = component.long_name || cityName; }
      if (component.types[0] === 'administrative_area_level_1') { regionName = component.long_name; }
      if (component.types[0] === 'country') { countryName = component.long_name; }
    }
    return {
      cityName: cityName || '',
      regionName: regionName || '',
      countryName: countryName || ''
    };
  })
  .catch(error => {
    const message = error.Control ? error.Control.Message : 'error';
    dispatch(toggleSnackBar(true, message, 'error'));
  });

export const saveAddress = address => async dispatch => {
  const addresses = await getAddresses();

  const newAddress = await addAddressService({
    ...address,
    isDefault: !addresses.length,
    ...(!address.phoneNumber && { phoneNumber: (await getUser()).phoneNumber })
  });

  const newAddresses = await getAddresses();

  dispatch(updateAddressList(newAddresses.map(DEPRECATED_convertAddressToAPIAddress)));
  return DEPRECATED_convertAddressToAPIAddress(newAddress);
};

export const deleteAddress = id => async dispatch => {
  await deleteAddressService(id);
  const addresses = await getAddresses();
  const newAddresses = addresses.filter(address => address.id !== id);
  dispatch(updateAddressList(newAddresses.map(DEPRECATED_convertAddressToAPIAddress)));
};

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
export const DEPRECATED_updateAddress = address => async dispatch => {
  await updateAddressService({ id: address.addressId, ...address });
  const addresses = await getAddresses();
  const newAddresses = addresses
    .map(DEPRECATED_convertAddressToAPIAddress);

  dispatch(updateAddressList(newAddresses));
};

export const checkServiceability = (address, cb) => (dispatch, getState) => {
  const { pincode, preferences = {} } = address;
  const callback = getState().app.checkServiceability;
  checkService(pincode)
    .then(response => {
      if (response.Control.Status) return geocodeByAddress(`${pincode}`);
      return null;
    })
    .then(reverseGeoCode)
    .then(res => {
      let cityName = ''; let regionName = ''; let
        countryName = '';
      const components = res.data[0].address_components;
      // eslint-disable-next-line no-restricted-syntax
      for (const component of components) {
        if (component.types[0] === 'administrative_area_level_2') { if (cityName === '') cityName = component.long_name; }
        if (component.types[0] === 'locality') { cityName = component.long_name; }
        if (component.types[0] === 'administrative_area_level_1') { regionName = component.long_name; }
        if (component.types[0] === 'country') { countryName = component.long_name; }
      }

      const isAddrAlready = getState().userAddress.address.address;
      const addr = {
        ...address,
        address: isAddrAlready || res.data[0].formatted_address,
        latitude: res.lat,
        longitude: res.lng,
        pincode,
        cityName: cityName || preferences.city,
        regionName,
        country: countryName,
        userId: getUserId(),
        isAutoSelected: true,
        isDefault: true,
        storeId: preferences.storeId,
        storeName: preferences.storeName
      };

      return Promise.all([
        dispatch(updateUser({
          ...getState().user,
          pincode,
          latitude: res.lat,
          longitude: res.lng,
          storeId: getState().userAddress.address.storeId || preferences.storeId,
          storeName: getState().userAddress.address.storeName || preferences.storeName,
          cityName: cityName || preferences.city
        })),
        dispatch(selectAddr(addr))
      ]);
    })
    .then(() => {
      if (cb !== undefined) cb();
      if (callback) callback();
    })
    .catch(error => {
      if (Object.keys(preferences).length !== 0) return;

      const { pincode } = address;
      const message = error.Control && error.Control.Message
        ? error.Control.Message
        : `Currently service not available in your pincode ${pincode}. Try a different location`;
      dispatch(alertBox({ openAlertBox: true, alertBoxText: message }));
    });
};
