const orderDetails = (state = [], action) => {
  switch (action.type) {
    case 'ORDER_DETAILS':
      return action.data;
    default:
      return state;
  }
};

export default orderDetails;
