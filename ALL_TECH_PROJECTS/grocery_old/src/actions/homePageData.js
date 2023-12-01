import API_ROUTES from "../helper/network/api-routes"
import { fetchApi } from '../helper/network/fetch'

//action type
export const HOMEPAGE_DATA = 'HOMEPAGE_DATA'
export const HOME_CONFIGURATION = 'HOME_CONFIGURATION'

// action creator
const homePageDataAction = (data) => (
    {
        type: HOMEPAGE_DATA,
        data
    }
)

const getConfiguration = (payload) => (
    {
        type: HOME_CONFIGURATION,
        payload
    }
)

//thunk action creator returns a function
export function homePageData() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch, getState) {
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        // return fetchApi({
        //     url: API_ROUTES.getDashboard
        // })
        //     .then(response => {
        //         response => response.json(),
        //     })
        //     .catch(e => {

        //     })
        let pincode = getState().userAddress.address.pincode;
        let storeId = getState().userAddress.address.storeId || getState().kirana.selectedKirana.StoreId ;
        return fetchApi({ url: API_ROUTES.getDashboard, body: { pincode, storeId } }).then(
            response => dispatch(homePageDataAction(response)),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render
            error => {
                console.log("In Catch Block");
            }
        )
    }
}

export function getConfig() {
    return function (dispatch, getState) {
        return fetchApi({ url: API_ROUTES.getConfig, body: { customerId: getState().user.userId } }).then(
            response => dispatch(getConfiguration(response.Data && response.Data.Configurations)),
            error => {
                console.log("In Catch Block");
            }
        )
    }
}
