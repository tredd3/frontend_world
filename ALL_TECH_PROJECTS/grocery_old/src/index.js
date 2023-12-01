import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
/*import { SendDataToWebApp } from './helper/bridge/appBridge';*/
import { sendAccessToken, sendAdParams } from './helper/bridge/appBridge';

window.sendAccessToken = sendAccessToken;
window.sendAdParams = sendAdParams;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
