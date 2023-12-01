const productDetails = (state = '', action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS':
      return action.data;
    default:
      return state;
  }
};

export default productDetails;
