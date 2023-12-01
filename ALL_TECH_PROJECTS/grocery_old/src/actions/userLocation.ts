//action type
export const USER_LOCATION = 'USER_LOCATION'

// action creator
const addUserLocation = (data: object) => ({
    type: USER_LOCATION,
    data
})

//thunk action creator returns a function
export function setLocation(userLocation: object) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch: any) {
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return new Promise((resolve, reject) => {
            dispatch(addUserLocation(userLocation));
            //resolve();
        });
    }
}
