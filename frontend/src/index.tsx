import { AuthProvider } from "react-oidc-context";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const onSigninCallback = (user: any) => {
    console.log(user);
    window.history.replaceState({}, document.title, window.location.pathname);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider
            authority={(window as any).ENV?.AUTHORITY}
            client_id={(window as any).ENV?.CLIENT_ID}
            redirect_uri={window.location.origin}
            onSigninCallback={onSigninCallback}
        >
            <App />
        </AuthProvider>
    </React.StrictMode>,
);
