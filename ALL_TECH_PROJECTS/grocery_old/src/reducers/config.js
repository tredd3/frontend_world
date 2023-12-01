//We return the previous state in the default case. 
//It's important to return the previous state for any unknown action.

const config = (state = {}, action) => {
    switch (action.type) {
        case 'HOME_CONFIGURATION':
            return action.payload
        default:
            return state
    }
}

export default config