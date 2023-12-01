//selectedDM = selected Delivery Mode
const initialState = {
  PaymentMethod: 2
}
const checkout = (state = initialState, action) => {
    switch (action.type) {
        case "CHECKOUT":
            return { ...state, ...action.payload };
        case "PAYMENT_MODE":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default checkout;
