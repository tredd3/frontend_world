import API_ROUTES from "../helper/network/api-routes"
import {
    fetchApi
} from '../helper/network/fetch'
import store from '../store'
//action type
export const SHOPBY_CATEGORIES = 'SHOPBY_CATEGORIES'
export const MORE_SHOPBY_CATEGORIES = 'MORE_SHOPBY_CATEGORIES'
// import shopByCategoriesResult from "../components/search/response";

// action creator
const shopByCategoriesAction = (data, PageNo) => {
    if (PageNo) {
        return {
            type: MORE_SHOPBY_CATEGORIES,
            data
        }
    } else {
        return {
            type: SHOPBY_CATEGORIES,
            data
        }
    }
}

//thunk action creator returns a function
export var shopByCategories = (function () {
    let PageNo = 0;
    return function (params = {}) {
        const {
            Level = 1, CategoryId = 0, increasePagenumber = false
        } = params;
        if (increasePagenumber) {
            PageNo++;
        } else {
            PageNo = 0;
        }
        // const StoreId = store.getState().kirana.selectedKirana.StoreId ? store.getState().kirana.selectedKirana.StoreId : 0;
        const StoreId = store.getState().userAddress.address ? store.getState().userAddress.address.storeId || store.getState().kirana.selectedKirana.StoreId : 0;
        // this function now acts as a normal function
        if (Level === 2) {
            return fetchApi({
                url: API_ROUTES.getCategories,
                body: {
                    Level,
                    CategoryId,
                    StoreId:StoreId||0,
                    PageNo,
                    pageSize: 10
                }
            })
        }
        return function (dispatch) {
            return fetchApi({
                url: API_ROUTES.getCategories,
                body: {
                    Level,
                    CategoryId,
                    StoreId:StoreId||0,
                    PageNo,
                    pageSize: 10
                }
            }).then(
                response => dispatch(shopByCategoriesAction(response, PageNo)),
                error => {
                    console.log("In Catch Block");
                }
            )
        }
    }
})()