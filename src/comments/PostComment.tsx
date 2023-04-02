import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { postComment } from "./comment.api";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const PostComment = ({ motorcycleId, diagramId, partId }: Props) => {
    const [text, setText] = useState("");
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);

    const handlePostComment = () => {
        setErrorMessage("");
        setPending(true);

        postComment(
            { motorcycleId, diagramId, partId },
            {
                text,
                motorcycleId,
                diagramId,
                partId,
            },
            getAccessTokenSilently,
        )
            .then(() => setText(""))
            .catch(() => setErrorMessage("Failed to post new comment"))
            .finally(() => setPending(false));
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-slate-50/10 dark:bg-slate-400/10 dark:bg-slate-800"
                rows={4}
                placeholder={
                    isAuthenticated ? "Write comment" : "Log in to comment"
                }
                disabled={!isAuthenticated || pending}
            />
            <div className="flex flex-row-reverse items-center justify-between">
                <button
                    onClick={handlePostComment}
                    disabled={!isAuthenticated || pending || !text}
                    className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:bg-slate-300 disabled:text-slate-400 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:dark:bg-slate-600 disabled:dark:text-slate-500 sm:w-auto"
                    // className="dark:highlight-white/20 rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400 disabled:dark:bg-slate-500 disabled:dark:text-slate-700"
                >
                    {isAuthenticated ? "Post comment" : "Log in to comment"}
                </button>
                {pending && (
                    <div className="text-slate-300">Posting comment...</div>
                )}
                {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};
