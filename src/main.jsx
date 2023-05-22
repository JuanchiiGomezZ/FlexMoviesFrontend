import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/imports.scss";
import State from "./context/State";
import { TokenProvider } from "./context/TokenContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <State>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </State>
  </TokenProvider>
);
