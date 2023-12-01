import promiseMemoize from 'promise-memoize';

const incomingMessageTypes = {
  receivedAccessToken: 'accessToken',
  receivedLocation: 'adparams'
};

const pendingPromises = {};

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const handleIncomingMessage = type => data => {
  if (!pendingPromises[type]) return; // No pending promises waiting for this message
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;

  if (type === incomingMessageTypes.receivedAccessToken) {
    pendingPromises[type].resolve({
      accessToken: parsed.access_tokens,
      refreshToken: parsed.refresh_token,
      apiKey: parsed.dataSetOne,
      expiresAt: Date.now() + (parsed.expires_in * 1000)
    });
  } else if (type === incomingMessageTypes.receivedLocation) {
    pendingPromises[type].resolve({
      lat: parsed.latitude,
      lng: parsed.longitude
    });
  }

  delete pendingPromises[type];
};

// The native app calls these global functions when it has to send us a message
window.sendAccessToken = handleIncomingMessage(incomingMessageTypes.receivedAccessToken);
window.sendAdParams = handleIncomingMessage(incomingMessageTypes.receivedLocation);

const sendToApp = payload => {
  const encodedData = window.btoa(JSON.stringify(payload));

  // eslint-disable-next-line no-underscore-dangle
  if (window.android && window.android.__externalCall) window.android.__externalCall(encodedData);
  // eslint-disable-next-line no-underscore-dangle
  if (window.__externalCall) window.__externalCall(encodedData);
  if (isIOS) window.webkit.messageHandlers.callback.postMessage(encodedData);
};

const sendToAppExpectingResponse = payload => {
  // payload.type must match incomingMessageTypes
  if (!pendingPromises[payload.type]) {
    let resolve;
    console.time(`Intent-${payload.type}`);
    const promise = new Promise(r => { resolve = r; });
    promise.then(data => {
      console.timeEnd(`Intent-${payload.type}`);
      return data;
    });
    pendingPromises[payload.type] = { promise, resolve };
  }

  sendToApp(payload);
  return pendingPromises[payload.type].promise;
};

export const getTokens = promiseMemoize(() => sendToAppExpectingResponse({
  type: 'accessToken',
  data: { getAccessToken: true }
}));

export const getLatLng = () => sendToAppExpectingResponse({
  type: 'adparams',
  data: { location: true }
}).then(({ lat, lng }) => {
  if (Number(lat) === 0 && Number(lng) === 0) throw new Error("Couldn't get location");
  return { lat, lng };
});

export const closeWindow = () => sendToApp({
  type: 'close',
  data: {}
});

export const makeCall = phoneNumber => sendToApp({
  type: 'makeCall',
  value: phoneNumber
});

export const showHeader = () => sendToApp({
  type: 'showHeader',
  data: { color: '#054484' }
});

export const hideHeader = () => sendToApp({
  type: 'hideHeader',
  data: { color: '#054484' }
});

export const chatWithCustomerService = () => sendToApp({
  type: 'launchbrowser',
  value: `https://wa.me/${917000370003}/?text=${encodeURIComponent('Hi')}`
});

// True if we want to give control to native for hardware back, false if we want web to have control
const toggleBackButtonControl = enableNativeControl => {
  if (window.android) {
    sendToApp({
      type: 'handleWebviewBack',
      value: enableNativeControl
    });
  }
};

export const startHandlingBackButton = callback => {
  if (typeof callback !== 'function') {
    return () => { /* No op */ };
  }

  toggleBackButtonControl(false);

  const stopHandlingBackButton = () => {
    toggleBackButtonControl(true);

    delete window.handleBackKey;
  };

  window.handleBackKey = callback;

  return stopHandlingBackButton;
};

export const notifyBannerClick = (bannerId, type, subType) => {
  if (window.AppInterface && window.AppInterface.onBannerClick) {
    window.AppInterface.onBannerClick(`app://jiokart/product/banner?type=${type}&subType=${subType}&bannerId=${bannerId}`);
    return true;
  }

  return false;
};
