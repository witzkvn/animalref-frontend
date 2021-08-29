import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { authHeader } from "./helper/functions/auth-header";
import axios from "axios";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import history from "./helper/functions/createBrowserHistory";

// axios settings
const getHeadersKeys = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authHeader(),
  };
};

export const client = () => {
  return axios.create({
    baseURL: "http://localhost:3001/api/v1/",
    headers: getHeadersKeys(),
  });
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
