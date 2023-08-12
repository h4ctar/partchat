import { AuthProvider } from "react-oidc-context";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider
            authority={import.meta.env.VITE_AUTHORIITY}
            client_id={import.meta.env.VITE_AUTH0_CLIENT_ID}
            redirect_uri={window.location.origin}
        >
            <App />
        </AuthProvider>
    </React.StrictMode>,
);
