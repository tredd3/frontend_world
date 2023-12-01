//each reducer manages its own part of the global state. The state parameter is 
//different for every reducer, and corresponds to the part of the state it manages.

// define ur initial state it may or maynot be empty
// in the first call initial state is used and in the subsequent calls current state is used
const authStatus = (state = "", action) => {
    switch (action.type) {
        case 'ADD_TODO':
            console.log("logging in.....");
            return "SUCCESS"
        default:
            return state
    }
}

export default authStatus