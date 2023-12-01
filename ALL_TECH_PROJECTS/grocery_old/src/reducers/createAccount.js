//We return the previous state in the default case. 
//It's important to return the previous state for any unknown action.

const createAccount = (state = "", action) => {
    switch (action.type) {
        case 'CREATE_ACCOUNT':
            return action.data
        default:
            return state
    }
}

export default createAccount