import { combineReducers } from 'redux'
import authStatus from './authStatus'
import createAccount from './createAccount'
import shopByCategories from "./shopByCategories"
import kirana from './kirana'
import cart from './cart'
import homePageData from "./homePageData"
import config from "./config"
import homePageSeeMore from "./homePageSeeMore"
import userAddress from './address';
import userLocation from './userLocation';
import user from './user';
import app from './appState';
import productDetails from './productDetails';
import similarItems from "./similarItems";
import orderDetails from "./orderDetails";
import deliveryModes from "./deliveryModes";
import selectedDM from "./selectedDM";
import checkout from "./checkout";

// each reducer returns a object and all the objects are merged to form a big object called app state
// follow the convention of keeping the state key same as reducer function name
// value is the partial state returned by a reducer returns
// partial state can be any data type not necessarily object
//once u dispatch an action to the store all the reducers are called and  based on the
//action type one/multiple reducers changes the application state

export default combineReducers({
    app,
    authStatus,
    createAccount,
    config,
    kirana,
    shopByCategories,
    homePageData,
    homePageSeeMore,
    user,
    cart,
    userAddress,
    productDetails,
    similarItems,
    userLocation,
    orderDetails,
    deliveryModes,
    checkout,
    selectedDM,
})

