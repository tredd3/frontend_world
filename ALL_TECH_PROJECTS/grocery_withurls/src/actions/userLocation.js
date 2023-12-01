// action type
export const USER_LOCATION = 'USER_LOCATION';

// action creator
const addUserLocation = data => ({
  type: USER_LOCATION,
  data
});

export const setLocation = userLocation => dispatch => (
  dispatch(addUserLocation(userLocation))
);
