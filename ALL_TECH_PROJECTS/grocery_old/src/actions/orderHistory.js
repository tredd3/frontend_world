import API_ROUTES from "../helper/network/api-routes"
import {
    fetchApi
} from '../helper/network/fetch'
import dummyResponse from "../components/orderHistory/response";
import store from '../store';

export var getOrderHistory = (function () {
    let pageNumber = 1;
    return function (filter, increasePagenumber) {
        if (increasePagenumber) {
            pageNumber++;
        } else {
            pageNumber = 1;
        }
        console.log("pagenumber", pageNumber)
        const appState = store.getState()
        //const customerId = 10699731
        const customerId = appState.user.userId;
        let body;

        if (filter) {
            body = {
                customerId: customerId,
                filter: filter,
                pageNumber: pageNumber,
                pageSize: 10
            }
        } else {
            body = {
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: 10
            }
        }

        return fetchApi({
            url: API_ROUTES.getOderHistory,
            body: body
        }).then(
            response => response.Data.orders
        ).catch(error => [])
        //catch(error => dummyResponse.Data.orders)
    }
})();

export var searchOrderHistory = (function () {
    let pageNumber = 1;
    return function (input, increasePagenumber) {
        if (increasePagenumber) {
            pageNumber++;
        } else {
            pageNumber = 1;
        }
        console.log("pagenumber", pageNumber)
        const appState = store.getState()
        //const customerId = 10699731
        const customerId = appState.user.userId;
        let body = {
            customerId: customerId,
            itemName: input,
            pageNumber: pageNumber,
            pageSize: 10
        }

        return fetchApi({
            url: API_ROUTES.searchOrderHistory,
            body: body
        }).then(
            response => response.Data.orders
        ).catch(error => [])
        //.catch(error => dummyResponse.Data.orders)
    }
})();