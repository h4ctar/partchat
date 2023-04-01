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
    const [statusMessage, setStatusMessage] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handlePostComment = () => {
        setErrorMessage("");
        setStatusMessage("Posting comment...");
        setDisabled(true);

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
            .finally(() => {
                setStatusMessage("");
                setDisabled(false);
            });
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="w-full rounded-lg dark:bg-slate-800"
                rows={4}
                placeholder={
                    isAuthenticated ? "Write comment" : "Log in to comment"
                }
                disabled={disabled || !isAuthenticated}
            />
            <div className="flex flex-row-reverse items-center justify-between">
                <button
                    onClick={handlePostComment}
                    disabled={disabled || !isAuthenticated}
                    className="dark:highlight-white/20 rounded-lg px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400 disabled:dark:bg-slate-500 disabled:dark:text-slate-700"
                >
                    {isAuthenticated ? "Post comment" : "Log in to comment"}
                </button>
                {statusMessage && (
                    <div className="text-slate-300">{statusMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};
