import store from '../store';
import { setUser, getUser } from '../actions/user';

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
export const DEPRECATED_setTokensInStore = tokens => {
  store.dispatch(setUser({
    // eslint-disable-next-line camelcase, @typescript-eslint/camelcase
    access_token: tokens.accessToken,
    // eslint-disable-next-line camelcase, @typescript-eslint/camelcase
    refresh_token: tokens.refreshToken,
    login: true,
    xApiKey: tokens.apiKey,
    expiresAt: tokens.expiresAt
  }));
  store.dispatch(getUser({}));
};
