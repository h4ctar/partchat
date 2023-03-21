import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider
            domain="partswap.au.auth0.com"
            clientId="rOi3h9hOjCGd9LCCaTOoQqLR4rQHyjdY"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
