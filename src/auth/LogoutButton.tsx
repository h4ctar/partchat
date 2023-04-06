import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <a
            href=""
            onClick={(event) => {
                logout();
                event.preventDefault();
            }}
        >
            Log out
        </a>
    );
};
