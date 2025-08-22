import React from "react";
import ReactDOM from "react-dom/client"; //  Use React 18 root API
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

//  Ensure only one root rendering method is used
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//  Remove `reportWebVitals()` if it's not imported
