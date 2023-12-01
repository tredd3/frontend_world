const deliveryModes = (state = {}, action) => {
    switch (action.type) {
        case "GET_DELIVERY_MODES":
            return action.payload;
        default:
            return state;
    }
};

export default deliveryModes;
