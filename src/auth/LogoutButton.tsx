import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <button
            className="dark:highlight-white/20 rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
            onClick={() => logout()}
        >
            Log out
        </button>
    );
};
