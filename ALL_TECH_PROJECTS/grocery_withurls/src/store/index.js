import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// eslint-disable-next-line import/no-mutable-exports
let store;
if (process.env.NODE_ENV !== 'production') {
  const logger = () => next => action => {
    const result = next(action);
    return result;
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { createLogger } = require('redux-logger');
  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // neat middleware that logs actions
      logger
    ))
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );
}

export default store;