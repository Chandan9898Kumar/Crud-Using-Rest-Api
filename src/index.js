import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import ScrollTop from "./ScrollToTop/ScrollTop";
const root = ReactDOM.createRoot(document.getElementById("root"));

//  To remove console.log in the production build of a React application created. when it is running in production then no console.log will be visible nut in development it will.
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback="Something Went Wrong...">
      <Provider store={store}>
        <App />
        <ScrollTop />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
