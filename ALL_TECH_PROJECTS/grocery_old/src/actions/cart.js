import API_ROUTES from "../helper/network/api-routes"
// import response from "../components/homePage/response";
import {
    fetchApi
} from "../helper/network/fetch";
import {
    addCartApiBody,
    removeCartApiBody,
    moveItemApiBody
} from "../helper/makeApiBody"
import store from "../store";
import {
    toggleSnackBar
} from "./appState";

export const CART_GET_ITEMS = 'CART_GET_ITEMS'
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const GET_DELIVERY_MODES = 'GET_DELIVERY_MODES'
export const CHECKOUT = 'CHECKOUT'
export const PAYMENT_MODE = 'PAYMENT_MODE'
export const SET_DELIVERY_MODE = 'SET_DELIVERY_MODE'
export const UPDATE_PRD_QTY_OBJ = 'UPDATE_PRD_QTY_OBJ'


// const cartAddItemAction = (payload) => (
//     {
//         type: CART_ADD_ITEM,
//         payload
//     }
// )

const cartGetItemsAction = (payload) => ({
    type: CART_GET_ITEMS,
    payload
})

const cartDeliveryModes = (payload) => ({
    type: GET_DELIVERY_MODES,
    payload
})

const doTheCheckout = (payload) => ({
    type: CHECKOUT,
    payload
})

const updatePaymentModeAction = (payload) => ({
    type: PAYMENT_MODE,
    payload
})

const selectDeliveryMode = (payload) => ({
    type: SET_DELIVERY_MODE,
    payload
})

const updatePrdQtyObj = (payload) => ({
    type: UPDATE_PRD_QTY_OBJ,
    payload
})

// const cartRemoveItemAction = (payload) => (
//     {
//         type: CART_REMOVE_ITEM,
//         payload
//     }
// )

export function getDeliveryModes() {
    return function (dispatch, getState) {
        const body = {
            "StoreId": getState().userAddress.addresses.length > 0 && (getState().userAddress.address.storeId || getState().kirana.selectedKirana.StoreId || getState().userAddress.address.defaultStore),
            "OrderValue": getState().cart.TotalPay
        }
        return fetchApi({
            url: API_ROUTES.getDeliveryModes,
            body
        })
            .then((res) => {
                dispatch(cartDeliveryModes(res.Data.StoreOrder));
            })
            .catch(error => {
                console.log("deliverymode  RESPONSE ERROR");
            })
    }
}

export function cartAddItem(product) {
    return function (dispatch) {
        const body = addCartApiBody(product);
        return fetchApi({
            url: API_ROUTES.addCartItem,
            body
        })
            // return fetch(API_ROUTES.addCartItem)
            .then((res) => {
                // console.log("addCartItem", res);
                store.dispatch(toggleSnackBar(true, "Item added to Cart", "success"))
                return dispatch(cartGetItems());
                // return "SUCCESS"
            },
                error => {
                    store.dispatch(toggleSnackBar(true, "Error While Adding to cart", "error"))
                    console.log("addCartItem RESPONSE ERROR");
                    return "ERROR"
                    // dispatch(cartAddItemAction(response));
                }
            )
    }
}

export function cartAddExistingItem(product) {
    return function (dispatch, getState) {

        // let existingProduct = getState().cart.Shipments.map((ships)=>({
        //     Products: ships.Product.filter((item)=>product.ProductSkuId === item.ProductSkuId);
        // }))
        let acc = [];
        // console.log("acumlated cardt", getState().cart)

        getState().cart.Shipments && getState().cart.Shipments.forEach(shipment => {
            let findProduct = shipment.Product.filter((item) => product.ProductSkuId == item.ProductSkuId);
            if (findProduct.length > 0) {
                acc.push(findProduct[0]);
            }
        })

        // console.info("ACCUMULATED ITEM exiting", acc, product);

        if (acc.length < 1) {
            // console.log("adding same product with qty")
            return dispatch(cartAddItem(product));
        } else {
            console.log(acc[0].SelectedQuantity)
            console.log(product.Quantity)

            debugger;
            // console.log("CART ITEM Already present adding qty to product")
            return dispatch(cartAddItem({
                ...product,
                Quantity: acc[0].SelectedQuantity + product.Quantity
            }));
        }

        // if(existingProduct.length>0){
        //     existingProduct[0].Select
        // }
        // const body = addCartApiBody(product);
        // return fetchApi({url: API_ROUTES.addCartItem, body })
        // // return fetch(API_ROUTES.addCartItem)
        // .then((res)=>{
        //     // console.log("addCartItem", res);
        //     dispatch(cartGetItems());
        // },
        //     error => {
        //         console.log("addCartItem RESPONSE ERROR");
        //         // dispatch(cartAddItemAction(response));
        //     }
        // )
    }
}

export function cartRemoveItem(product) {
    return function (dispatch) {
        const body = removeCartApiBody(product);
        return fetchApi({
            url: API_ROUTES.removeCartItem,
            body
        })
            .then((res) => {
                // console.log("removeCartItem", res);
                dispatch(cartGetItems());
            },
                error => {
                    console.log("removeCartItem RESPONSE ERROR");
                }
            )
    }
}

export function cartMoveItem(product) {
    return function (dispatch) {
        const body = moveItemApiBody(product);
        return fetchApi({
            url: API_ROUTES.moveCartItem,
            body
        })
            .then((res) => {
                // console.log("removeCartItem", res);
                dispatch(cartGetItems());
            },
                error => {
                    console.log("cartMoveItems RESPONSE ERROR");
                }
            )
    }
}

export function cartGetItems() {
    return function (dispatch, getState) {
        return fetchApi({
            url: API_ROUTES.getCart,
            body: {
                "storeId": getState().userAddress.address.storeId || getState().kirana.selectedKirana.StoreId,
                userId: getState().user.userId
            }
        })
            .then((res) => {
                let prdQtyObj = {}
                if (res.Data.Shipments.length) {
                    let prdArr = res.Data.Shipments[0].Product
                    for (var i = 0; i < prdArr.length; i++) {
                        prdQtyObj[prdArr[i].ProductSkuId] = prdArr[i].SelectedQuantity;
                    }
                }
                return Promise.all([dispatch(cartGetItemsAction(res.Data)), dispatch(updatePrdQtyObj(prdQtyObj))])
            },
                error => {
                    dispatch(cartGetItemsAction({}))
                    console.log("cart GET items is error")
                })
    }
}

export function checkout(data) {
    return function (dispatch, getState) {

        return dispatch(doTheCheckout(data))
    }
}

export function updatePaymentMode(data) {
    return function (dispatch, getState) {

        return dispatch(updatePaymentModeAction(data))
    }
}

export function selectingDeliveryMode(mode) {
    return function (dispatch, getState) {
        // let selectDM = getState().deliveryModes.StorePickup.filter(dm => dm.DateValue == value)[0];
        return dispatch(selectDeliveryMode(mode))
    }
}
