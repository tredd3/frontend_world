export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_CONFIGURATION':
      return action.payload;
    default:
      return state;
  }
};
