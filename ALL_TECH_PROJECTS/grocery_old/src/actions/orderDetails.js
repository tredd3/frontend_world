import {
    fetchApi
} from "../helper/network/fetch";
import API_ROUTES from "../helper/network/api-routes";
export const ORDER_DETAILS = 'ORDER_DETAILS'
const orderDetailsAction = (data) => ({
    type: ORDER_DETAILS,
    data
})

export function orderDetails(orderId = "1535") {
    return function (dispatch, getState) {
        const appState = getState()
        //const customerId = 10699731
        const customerId = appState.user.userId;
        const StoreId = appState.kirana.selectedKirana.StoreId ? appState.kirana.selectedKirana.StoreId : 0;

        let body = {
            "orderId": orderId,
            "pageNumber": 0,
            "pageSize": 1,
            "storeId": StoreId,
            "customerId": customerId
        }

        return fetchApi({
            url: API_ROUTES.getOrderDetails,
            body: body
        }).then(res => {
            return dispatch(orderDetailsAction(res.Data.orders))
        }, error => {
            console.log("Order Details API not working properly");
        })
    }

}