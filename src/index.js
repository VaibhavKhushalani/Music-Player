import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <App />
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);
