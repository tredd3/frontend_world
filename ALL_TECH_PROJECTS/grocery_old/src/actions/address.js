import { SET_LAT_LNG, ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS_LIST, ADDRESS_LIST_SET_DEFAULT, SELECT_ADDRESS, CLEAR_DEFAULT } from "./constants";
import { fetchApi } from '../helper/network/fetch';
import API_ROUTES from '../helper/network/api-routes';
import store from '../store';
import { getIndexOf } from '../helper/utilites';
import { geocodeByAddress } from 'react-places-autocomplete';
import { getUserId } from "../helper/makeApiBody";
import {
  toggleSnackBar
} from "./appState";

export const setLatLngPin = (lat, lng, pincode) => {
  return {
    type: SET_LAT_LNG,
    data: { lat, lng, pincode }
  }
}

export const addAddress = address => {
  return {
    type: ADD_ADDRESS,
    data: address
  }
}

export const removeAddress = addressArr => {
  return {
    type: REMOVE_ADDRESS,
    data: addressArr
  }
}

export const updateAddressList = addressArr => {
  return {
    type: UPDATE_ADDRESS_LIST,
    data: addressArr
  }
}

export const setDefaultAddress = data => {
  return {
    type: ADDRESS_LIST_SET_DEFAULT,
    data
  }
}

export const selectAddr = address => {
  return {
    type: SELECT_ADDRESS,
    data: address
  }
}


export const clearDefaultAdd = () => {
  return {
    type: CLEAR_DEFAULT
  }
}

// save address api
// addressId = 0 will create new address
// existing addressId will update existing address with new values

const addUpdateAddress = (data) => {
  return fetchApi({
    url: API_ROUTES.saveAddress,
    body: data
  })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export const selectAddress = (id) => {
  return (dispatch, getState) => {
    let selectingAddress = getState().userAddress.addresses.filter(addr => addr.addressId === id)[0];
    if (selectingAddress !== undefined) {
      fetchApi({
        url: API_ROUTES.saveAddress,
        body: {
          addressId: id,
          isDefault: true
        }
      })
        .then(res => {
          localStorage.setItem('defaultAddress', JSON.stringify(selectingAddress));
          return dispatch(selectAddr({ ...selectingAddress, isDefault: true })); // userAddress.address will have selected (default) object
        })
        .then(() => dispatch(setDefaultAddress(getState().userAddress.addresses.map(addr => addr.addressId === selectingAddress.addressId ? { ...selectingAddress, isDefault: true } : { ...addr, isDefault: false })))) // set default true for particular selected address
        .catch(e => {
          console.log("setting defaeult error");
        })
    }
  }
}

export const clearDefaultAddress = () => {
  return (dispatch) => {
    localStorage.removeItem('defaultAddress');
    dispatch(clearDefaultAdd());
  }
}

export const getAddress = () => {
  return dispatch => {
    fetchApi({
      url: API_ROUTES.getAddress,
      body: {
        userId: store.getState().user.userId
      }
    })
      .then(response => {
        let defaultAddr = response.Data.addresses.filter(address => address.isDefault)[0];

        return Promise.all([
          dispatch(updateAddressList(response.Data.addresses)),
          defaultAddr ? dispatch(selectAddr(defaultAddr)) : null
        ])
      })
      .catch(error => {
        console.log("dispatching Get address thunk error")
      })
  }
}

export const saveAddress = data => {
  return dispatch => {
    return checkService(data.pincode)
      .then(response => {
        // console.log("inside geoCode; ", window.google.maps.LatLng, window.google.maps.Geocoder)
        if (response.Control.Status) {
          return geocodeByAddress(data.pincode + '')
        }
        else {
          return dispatch(toggleSnackBar(true, response.Control && response.Control.Message, 'error'))
        }
      })
      .then(results => {
        return reverseGeoCode(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      })
      .then((res) => {
        // if(res.Control && res.Control.Status === 1){
        return addUpdateAddress({
          ...data, isServiceable: true, latitude: res.lat,
          longitude: res.lng
        })
      })
      .then(response => {
        localStorage.setItem('defaultAddress', JSON.stringify(response.Data));
        store.dispatch(toggleSnackBar(true, "address added successfully", "success"))
        return dispatch(addAddress(response.Data))
      })
      .catch(error => {
        const message = error.Control ? error.Control.Message : "error"
        store.dispatch(toggleSnackBar(true, message, "error"))
        console.log("dispatching Save address thunk error")
      })
  }
}

export const deleteAddress = id => {
  return dispatch => {
    fetchApi({
      url: API_ROUTES.deleteAddress,
      body: {
        addressId: id
      }
    })
      .then(response => {
        let addresses = store.getState().userAddress.addresses;
        if (localStorage.getItem('defaultAddress').includes(id)) localStorage.removeItem('defaultAddress')
        let updatedAddresses = addresses.filter(obj => obj.addressId !== id);
        return dispatch(removeAddress(updatedAddresses));
      })
      .catch(error => {
        console.log("dispatching DELETE address thunk error")
      })
  }
}

export const updateAddress = address => {
  return dispatch => {
    addUpdateAddress(address)
      .then(response => {
        let addresses = store.getState().userAddress.addresses.map(addr => (addr.addressId === address.addressId) ? address : addr);
        // let index = getIndexOf(addresses, "addressId", response.Data.addressId);
        // let updatedAddress = { ...addresses[index], ...response.Data };
        // addresses[index] = updatedAddress;
        return dispatch(updateAddressList(addresses))
      })
      .catch(error => {

      })
  }
}

export const checkService = (pincode) => {
  return fetchApi({
    url: API_ROUTES.checkServiceability,
    body: { pincode }
  })
}

export const reverseGeoCode = (lat, lng) => {
  var latlng = new window.google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(status);
      }
      // This is checking to see if the Geocode Status is OK before proceeding
      if (status == window.google.maps.GeocoderStatus.OK) {
        resolve({ data: results, lat, lng })
      }
    });
  })

}

export const checkServiceability = (address, cb) => {
  const { pincode } = address;
  return (dispatch, getState) => {
    const callback = getState().app.checkServiceability;
    checkService(pincode)
      .then(response => {
        // console.log("inside geoCode; ", window.google.maps.LatLng, window.google.maps.Geocoder)
        if (response.Control.Status) {
          return geocodeByAddress(pincode + '')
        }
      })
      .then(results => {
        return reverseGeoCode(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      }).then((res) => {
        var cityName = "", regionName = "", countryName = "";
        let components = res.data[0].address_components;
        for (let component of components) {
          if (component.types[0] === "administrative_area_level_2") { cityName = component.long_name; }
          if (component.types[0] === "locality") { cityName = component.long_name; }
          if (component.types[0] === "administrative_area_level_1") { regionName = component.long_name; }
          if (component.types[0] === "country") { countryName = component.long_name; }
        }

        // console.log("check geocode serviceability ",results);
        //     let cityName, regionName, countryName, pincode ; 

        // for (let component in components) {
        //     if(component.types[0] === "administrative_area_level_2") { if (cityName === "") cityName = component.long_name}
        //     if(component.types[0] === "locality")                    { cityName = component.long_name }
        //     if(component.types[0] === "administrative_area_level_1") { regionName = component.long_name }
        //     if(component.types[0] === "country")                     { countryName = component.long_name }
        // }

        let isAddrAlready = getState().userAddress.address.address;
        let addr = {
          ...address,
          address: isAddrAlready ? isAddrAlready : res.data[0].formatted_address,
          latitude: res.lat,
          longitude: res.lng,
          pincode,
          cityName, regionName, country: countryName,
          userId: getUserId(),
          isAutoSelected: true,
          isDefault: true
        };
        localStorage.setItem('defaultAddress', JSON.stringify(addr));
        if (addr.addressId) {
          return Promise.all([
            dispatch(updateAddress(addr)),
            dispatch(selectAddr(addr))
          ])
        }
        return dispatch(selectAddr(addr))
      }
      )
      .then(() => {
        if (cb !== undefined) cb();
        if (callback) callback();
      })
      .catch(error => {
        dispatch(toggleSnackBar(true, error.Control && error.Control.Message, 'error'))
        console.log("check service EROR", error);
      })
  }
}
