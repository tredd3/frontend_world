import API_ROUTES from "../helper/network/api-routes"
import { fetchApi } from '../helper/network/fetch'

//action type
export const HOMEPAGE_SEEMORE = 'HOMEPAGE_SEEMORE'

// action creator
const homePageSeeMoreAction = (data) => (
    {
        type: HOMEPAGE_SEEMORE,
        data
    }
)

// thunk action creator returns a function
// export function homePageSeeMore({ type, subType, bannerId, pageNum = 0 }) {
//     // Thunk middleware knows how to handle functions.
//     // It passes the dispatch method as an argument to the function,
//     // thus making it able to dispatch actions itself.
//     return function (dispatch, getState) {
//         // The function called by the thunk middleware can return a value,
//         // that is passed on as the return value of the dispatch method.
//         const userId = getState().user.userId || 10701039;
//         const { pincode = 0, latitude = 0, longitude = 0, storeId = 0 } = getState().userAddress.address

//         const body = {
//             "bannerId": bannerId,
//             "isFC": 1,
//             "latitude": latitude || 0,
//             "longitude": longitude || 0,
//             "mobileNo": "0000000000",
//             "pageNum": pageNum,
//             "pincode": pincode || 0,
//             "size": 20,
//             "storeId": storeId,
//             "subType": subType,
//             "type": type,
//             "userId": userId
//         }

//         return fetchApi({ url: API_ROUTES.viewAllDashboard, body: body }).then(
//             response => dispatch(homePageSeeMoreAction(response)),
//             // Do not use catch, because that will also catch
//             // any errors in the dispatch and resulting render
//             error => dispatch(homePageSeeMoreAction({ Data: { products: [] } }))
//         )
//     }
// }

export var homePageSeeMore = (function () {
    let pageNum = 0
    return function homePageSeeMore({ type, subType, bannerId, increasePagenumber = false }) {
        if (increasePagenumber) {
            pageNum++;
        } else {
            pageNum = 0;
        }
        return function (dispatch, getState) {
            const userId = getState().user.userId || 10701039;
            const { pincode = 0, latitude = 0, longitude = 0, storeId = 0 } = getState().userAddress.address

            const body = {
                "bannerId": bannerId,
                "isFC": 1,
                "latitude": latitude || 0,
                "longitude": longitude || 0,
                "mobileNo": "0000000000",
                "pageNum": pageNum,
                "pincode": pincode || 0,
                "size": 20,
                "storeId": storeId,
                "subType": subType,
                "type": type,
                "userId": userId
            }

            return fetchApi({ url: API_ROUTES.viewAllDashboard, body: body }).then(
                response => dispatch(homePageSeeMoreAction(response)),
                // Do not use catch, because that will also catch
                // any errors in the dispatch and resulting render
                error => dispatch(homePageSeeMoreAction({ Data: { products: [] } }))
            )
        }
    }
})();