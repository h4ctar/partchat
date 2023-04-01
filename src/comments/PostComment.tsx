import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { postComment } from "./comment.api";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const PostComment = ({ motorcycleId, diagramId, partId }: Props) => {
    const [newCommentText, setNewCommentText] = useState("");
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [errorMessage, setErrorMessage] = useState("");

    const handlePostComment = () => {
        setErrorMessage("");
        postComment(
            { motorcycleId, diagramId, partId },
            {
                text: newCommentText,
                motorcycleId,
                diagramId,
                partId,
            },
            getAccessTokenSilently,
        ).catch(() => setErrorMessage("Failed to post new comment"));
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={newCommentText}
                onChange={(event) => setNewCommentText(event.target.value)}
                className="w-full rounded-lg dark:bg-slate-800"
                rows={4}
                placeholder={
                    isAuthenticated ? "Write comment" : "Log in to comment"
                }
                disabled={!isAuthenticated}
            />
            <div className="flex flex-row-reverse justify-between items-center">
                <button
                    onClick={handlePostComment}
                    disabled={!isAuthenticated}
                    className="font-semibold px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:text-white dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                >
                    {isAuthenticated ? "Post comment" : "Log in to comment"}
                </button>
                {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};
