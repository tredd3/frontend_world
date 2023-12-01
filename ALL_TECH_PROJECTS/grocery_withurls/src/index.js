import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './index.css';

if (process.env.NODE_ENV !== 'development') {
  const { log } = console;
  // eslint-disable-next-line no-console
  console.log = (...args) => {
    if (sessionStorage.getItem('6465627567') || localStorage.getItem('6465627567')) {
      log.apply(console, ...args);
    }
  };
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
