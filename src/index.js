import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { FilterContextProvider } from "./context/filterContext";
import { CartProvider } from "./context/cartContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const customDomain = process.env.REACT_APP_CLICK_IT_AUTH_APP_DOMAIN;
const customClientId = process.env.REACT_APP_CLICK_IT_AUTH_APP_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={customDomain}
    clientId={customClientId}
    redirectUri={window.location.origin}
  >
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </Auth0Provider>
);

reportWebVitals();
