import {
  Subject
} from "rxjs";

export const AppToWebObs = new Subject();
export const WebToAppObs = new Subject();

// Intents from web to Native App
export const WebToAppIntent = {
  accessToken: "accessToken",
  adparams: "adparams", //location
  close: "close"
}

// Intents from Native App to Web
export const AppToWebIntent = {
  sendAccessToken: "sendAccessToken",
  sendAdParams: "sendAdParams"
}

export const SendDataToWebApp = function (data) {
  try {
    console.log("Sending data from app to web");
    console.log("INTENT OBJECT >>>> " + JSON.stringify(data));
    AppToWebObs.next(data);
  } catch (e) {
    console.error("Caught error in receiving data from app to web");
    console.error(e.message);
  }
}

export const sendAccessToken = function (data) {
  let intentObject = {
    type: AppToWebIntent.sendAccessToken,
    data: data
  };
  SendDataToWebApp(intentObject);
}

export const sendAdParams = function (data) {
  let intentObject = {
    type: AppToWebIntent.sendAdParams,
    data: data
  };
  SendDataToWebApp(intentObject);
}

WebToAppObs.subscribe(function (intentDataStr) {
  if (process.env.NODE_ENV === "development" && true) {
    let webToAppIntent = JSON.parse(intentDataStr);
    if (webToAppIntent.type === WebToAppIntent.accessToken) {
      const { access_token, refresh_token, xApiKey } = JSON.parse(localStorage.getItem('user') || "{}")
      let accessTokenObj = {
        "access_tokens": access_token || "4590891b-bc56-4580-9e3c-bf588bbf7633",
        "refresh_token": refresh_token || "ea151079-25a3-4b77-b273-548dec5974b7",
        "refreshTokenUrl": "https://api.jiomoney.com/jm/auth/oauth/v2/token",
        "dataSetOne": xApiKey || "l7xxd82dd824f0d14fbfb4616cd49205d5de",
        "dataSetTwo": xApiKey || "l7xxd82dd824f0d14fbfb4616cd49205d5de",
        "expires_in": "3600"
      }
      let accessTokenData = {
        type: AppToWebIntent.sendAccessToken,
        data: accessTokenObj
      }
      SendDataToWebApp(accessTokenData);
    }
    if (webToAppIntent.type === WebToAppIntent.adparams) {
      let addParamsObj = {
        latitude: "12.9218702",
        longitude: "77.6642376"
      }
      let addParamsData = {
        type: AppToWebIntent.sendAdParams,
        data: addParamsObj
      }
      SendDataToWebApp(addParamsData);
    }
  } else {
    try {
      console.log("Sending data to app from web " + intentDataStr);
      // window.AppInterface.dataFromWeb(intentDataStr)
      let encodedIntentData = window.btoa(intentDataStr);
      console.log("encodedIntentData: " + encodedIntentData);

      if (window.android && window.android.__externalCall) {
        window.android.__externalCall(encodedIntentData);
      }
      if (window.__externalCall) {
        window.__externalCall(encodedIntentData);
      }
      //window.android.__externalCall(encodedIntentData);
      window.webkit.messageHandlers.callback.postMessage(encodedIntentData)

    } catch (e) {
      console.error("ERROR while sending data to app");
      console.error(e.message);
    }
  }
})
