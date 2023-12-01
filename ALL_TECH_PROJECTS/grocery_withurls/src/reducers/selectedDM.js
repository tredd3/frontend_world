const selectedDM = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DELIVERY_MODE':
      return action.payload;
    default:
      return state;
  }
};

export default selectedDM;
