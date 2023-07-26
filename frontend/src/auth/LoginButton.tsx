import { useAuth0 } from "@auth0/auth0-react";

type Props = {
    buttonText?: string;
};

export const LoginButton = ({ buttonText = "Log in" }: Props) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    if (isAuthenticated) {
        return null;
    }

    return (
        <button
            className="dark:highlight-white/20 rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-slate-700 focus:outline-none dark:bg-sky-500 dark:hover:bg-sky-400"
            onClick={() =>
                loginWithRedirect({
                    appState: {
                        returnTo: window.location.pathname,
                    },
                })
            }
        >
            {buttonText}
        </button>
    );
};
