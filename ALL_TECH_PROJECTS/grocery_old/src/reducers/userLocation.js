//We return the previous state in the default case. 
//It's important to return the previous state for any unknown action.

const userLocation = (state = { address: "" }, action) => {
    switch (action.type) {
        case 'USER_LOCATION':
            return action.data
        default:
            return state
    }
}

export default userLocation