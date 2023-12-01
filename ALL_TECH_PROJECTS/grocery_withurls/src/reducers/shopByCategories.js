export default (state = {}, action) => {
  switch (action.type) {
    case 'SHOPBY_CATEGORIES':
      return action.data;
    case 'MORE_SHOPBY_CATEGORIES':
      return { ...state, ...action.data };
    default:
      return state;
  }
};
