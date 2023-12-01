import {
  SET_USER,
  SET_NEW_AUTH_TOKEN
} from "./constants";
import API_ROUTES from '../helper/network/api-routes';
import {
  fetchApi
} from '../helper/network/fetch';
import store from '../store';
let NewaccessToken;

export const setUser = (data) => {
  return {
    type: SET_USER,
    data: data
  }
}

export const setNewToken = (data) => {
  return {
    type: SET_NEW_AUTH_TOKEN,
    data: data
  }
}

export const addUser = data => {
  return dispatch => {
    return fetchApi({
      url: API_ROUTES.addUser,
      body: data
    }).then(response => {
      dispatch(setUser({ userId: response.Data.userId }));
    }).catch(e => {

    })
    // dispatch(setUser({
    //   userId: "9953"
    // }));
  }
}



export const updateUser = data => {
  return (dispatch, getState) => {
    let nameArr = data.name.split(" ");
    let firstName = nameArr[0];
    const reducer = (accumulator, currentValue, i) => { return (i === 0) ? '' : accumulator + ' ' + currentValue };
    let lastName = nameArr.length !== 1
      ? nameArr.length !== 2
        ? nameArr.reduce(reducer, null)
        : nameArr[1]
      : ""
    fetchApi({
      url: API_ROUTES.updateUser,
      body: {
        userId: getState().user.userId,
        emailId: data.email,
        dob: data.dob,
        gender: data.gender,
        firstName,
        lastName,
        mobileNumber: data.phoneNumber
      }
    })
      .then(response => {
        let user = {
          ...getState().user,
          ...data
        }
        localStorage.setItem('user', JSON.stringify(user));
        return dispatch(setUser({
          ...user
        }));
      })
      .catch(e => {
        console.log("Error", e)
      })
  }
}

export const getUser = data => {
  return dispatch => {
    fetchApi({ url: API_ROUTES.getUserDetail, body: {} })
      .then(response => {
        let webApp = process.env.APP_TYPE == "web" ? true : false;
        let user = {
          customerName: response.Data.customerName,
          firstName: response.Data.firstName,
          lastName: response.Data.lastName,
          userId: response.Data.userId,
          phoneNumber: response.Data.mobileNumber,
          login: true,
          gender: response.Data.gender,
          dob: response.Data.dob,
          email: response.Data.emailId,
        }
        if (webApp) {
          user.access_token = data.access_token;
          user.refresh_token = data.refresh_token;
          user.uuid = data.uuid;
          user.expiresAt = data.expiresAt;
        } else {
          user = { ...store.getState().user, ...user };
        }
        localStorage.setItem('user', JSON.stringify(user));
        return dispatch(setUser({
          ...user
        }));
      })
      .catch(e => {
        let MessageCode = e.Control && e.Control.MessageCode
        if (MessageCode && MessageCode === 404) {
          if (data.history) {
            data.history.push("/account/address/add/addUder");
          }
          // fetchApi({
          //   url: API_ROUTES.addUser,
          //   body: { mobileNumber: "7021143366", firstName: "MyJio", lastName: "User" }
          // }).then(response => {
          //     dispatch(setUser({ userId: response.Data.userId }));
          //   })
          //   .catch(e => {

          //   }) 
        }
      })
  }
}

const addUserToBackend = data => {

}

export const getNewAccessToken = () => {
  return (dispatch, getState) => {
    const AUTH_KEY = process.env.AUTHORISATION_VALUE;
    var params = {
      grant_type: "refresh_token",
      refresh_token: getState().user.refresh_token
    }
    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(API_ROUTES.getNewAccessToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": `Basic ${AUTH_KEY}`,
      },
      body: formBody
    }).then(response => response.json())
      .then(response => {
        let userNewTokens = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expiresAt: Date.now() + (response.expires_in * 1000),
        }
        localStorage.setItem('user', JSON.stringify({ ...getState().user, ...userNewTokens }));
        return dispatch(setNewToken(userNewTokens));
      })
      .catch(e => {
        console.log("ERROR HAPPENED During intializing User ")
      })
  }
}
