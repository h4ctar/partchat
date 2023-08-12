import { useAuth } from "react-oidc-context";

type Props = {
    buttonText?: string;
};

export const LoginButton = ({ buttonText = "Log in" }: Props) => {
    const { isAuthenticated, signinRedirect } = useAuth();

    if (isAuthenticated) {
        return null;
    }

    return (
        <button
            className="dark:highlight-white/20 rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-slate-700 focus:outline-none dark:bg-sky-500 dark:hover:bg-sky-400"
            onClick={() =>
                signinRedirect()
            }
        >
            {buttonText}
        </button>
    );
};
