import { useAuth } from "react-oidc-context";

export const LogoutButton = () => {
    const { isAuthenticated, removeUser, signoutRedirect, signoutSilent } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <a
            href=""
            onClick={(event) => {
                signoutRedirect();
            }}
        >
            Log out
        </a>
    );
};
