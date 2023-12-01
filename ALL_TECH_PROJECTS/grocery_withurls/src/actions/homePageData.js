import { getWidgetDefinitions } from '../services/dashboard2';

// action type
export const HOMEPAGE_DATA = 'HOMEPAGE_DATA';
export const HOME_CONFIGURATION = 'HOME_CONFIGURATION';

// action creator
const homePageDataAction = data => ({
  type: HOMEPAGE_DATA,
  data
});

const getConfiguration = payload => ({
  type: HOME_CONFIGURATION,
  payload
});

export const homePageData = () => dispatch => getWidgetDefinitions()
  .then(response => dispatch(homePageDataAction(response)));

export const setConfig = data => dispatch => {
  dispatch(getConfiguration(data && data));
};
