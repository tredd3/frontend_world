const initialState = {
  PaymentMethod: 2
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT':
      return { ...state, ...action.payload };
    case 'PAYMENT_MODE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
