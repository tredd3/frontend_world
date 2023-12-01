import API_ROUTES from "../helper/network/api-routes"
//action type
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'

// action creator
const createAccountAction = (data: string) => ({
    type: CREATE_ACCOUNT,
    data
})

//thunk action creator returns a function
export function createAccount(userDetails: object) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch: any) {
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(API_ROUTES.addUser)
            .then(
                response => response.json(),
                // Do not use catch, because that will also catch
                // any errors in the dispatch and resulting render
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(createAccountAction("SUCCESS"))
            )
    }
}
