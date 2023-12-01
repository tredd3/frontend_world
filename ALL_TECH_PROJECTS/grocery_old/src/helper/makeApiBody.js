import store from '../store'

// trying to declare sources of truth for particular data 
// for e.g. StoreId needs to come in userADdress default selected address.

const state = store.getState();

function getCartId () {
    // console.log("getCartId", state);
    // console.log("getCartId geting state", store.getState());
    return store.getState().cart.CartId || 0;
    // return 0;
}

function getSelectedStoreId () {
    // return state.kirana.selected.StoreId || 1175669
    return store.getState().userAddress.address.storeId || 0
}

export function getUserId () {
    return store.getState().user.userId
}

export function addCartApiBody ({ProductSkuId,Quantity = 1, ProductType = 0}) {
    return {
        // cartId: getCartId(),
        product: [{skuId:ProductSkuId, qty: Quantity, productType: ProductType}],
        storeId: getSelectedStoreId(),
        userId: getUserId()
    }
}

export function removeCartApiBody ({ProductSkuId,Quantity = 0, ProductType = 0}) {
    return {
        cartId: getCartId(),
        // product: [{skuId:ProductSkuId, qty: Quantity, productType: ProductType}],
        skuId: ProductSkuId,
        qty: Quantity,
        type: ProductType,
        // storeId: getSelectedStoreId(),
        // userId: getUserId()
    }
}

export function moveItemApiBody ({ProductSkuId,Quantity = 0, ProductType = 0, moveType}) {
    return {
        cartId: getCartId(),
        // product: [{skuId:ProductSkuId, qty: Quantity, productType: ProductType}],
        skuId: ProductSkuId,
        qty: Quantity,
        productType: ProductType,
        moveType
        // storeId: getSelectedStoreId(),
        // userId: getUserId()
    }
}

