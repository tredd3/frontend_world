import { createSelector } from 'reselect';

const app = state => state.app;

const appState = state => state;
export const showSpinner = createSelector(app, app => app.showSpinner);

export const cart = createSelector(appState, appState => appState.cart);

export const snackbar = createSelector(app, app => ({
  type: app.snackBarType,
  message: app.snackBarText,
  flag: app.snackBarStatus
}));
