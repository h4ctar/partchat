import { useAuth } from "react-oidc-context";

export const LogoutButton = () => {
    const { isAuthenticated, signoutPopup } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <a href="" onClick={() => signoutPopup()}>
            Log out
        </a>
    );
};
