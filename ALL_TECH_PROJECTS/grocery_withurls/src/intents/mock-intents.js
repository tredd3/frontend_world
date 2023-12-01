import accessToken from '../token';
// eslint-disable-next-line no-console
const log = str => console.log(`[INTENT] ${str}`);

export const getTokens = async () => {
  log('getTokens');

  return {
    accessToken,
    refreshToken: 'a90d269a-633e-41c7-8285-c4453490ab4f',
    apiKey: process.env.REACT_APP_API_KEY,
    expiresAt: Date.now() + (3600 * 1000)
  };
};

export const getLatLng = async () => {
  log('getLatLng');
  // throw new Error("Couldn't get location");
  return { lat: '19.1268588', lng: '73.0029283' };
};

export const closeWindow = () => log('Closing window');
export const makeCall = phoneNumber => log(`Calling 9988333954 instead of ${phoneNumber}`);
export const showHeader = () => log('Showing header');
export const hideHeader = () => log('Hiding header');
export const chatWithCustomerService = () => log('Starting WhatsApp chat with customer service"');
export const startHandlingBackButton = callback => {
  log('start handling back button on web');

  window.handleBackKey = callback;
  return () => {
    log('stop handling back button on web');
    delete window.handleBackKey;
  };
};
export const notifyBannerClick = () => false;
