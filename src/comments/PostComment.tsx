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

    const handlePostComment = () => {
        postComment(
            { motorcycleId, diagramId, partId },
            {
                text: newCommentText,
                motorcycleId,
                diagramId,
                partId,
            },
            getAccessTokenSilently,
        );
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
            <button
                onClick={handlePostComment}
                disabled={!isAuthenticated}
                className="font-semibold px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:text-white dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 self-end"
            >
                {isAuthenticated ? "Post comment" : "Log in to comment"}
            </button>
        </div>
    );
};
