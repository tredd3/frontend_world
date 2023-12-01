import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
//The Redux store saves the complete state tree returned by the root reducer
import rootReducer from '../reducers'

// for debugging purpose
const loggerMiddleware = createLogger({
    predicate: (getState, action) => {
        if(action.type.includes("FETCH")) return false;
        if(action.type.includes("SPINNER")) return false;
        return true
    },
    collapsed: true
})

// design the shape of your application's state before rushing into the implementation.
// keep your state simple without any nesting if there is a nesting involved use immutable.js for performance
// or u can also reducer composition 
export interface IAppState {
    authStatus: string;
    createAccount: string;
    userLocation: object;
    categorySearch: object;
    homePageData: object;
}

//initial APP state 
//key is the name of the reducer and value is the return value of the reducer

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

export default store;
