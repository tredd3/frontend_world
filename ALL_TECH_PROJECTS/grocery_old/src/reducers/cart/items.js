const items = (state = { prdQtyObj: {} }, action) => {
  switch (action.type) {
    case "CART_GET_ITEMS":
      return { ...state, ...action.payload };
    case "ADD_TO_CART":
      return { ...state, ...action.payload };
    case "UPDATE_PRD_QTY_OBJ":
      return { ...state, ...{ prdQtyObj: action.payload } };
    default:
      return state;
  }
};

export default items;
