import { useComments } from "./comment.hooks";
import Avatar from "boring-avatars";
import { useState } from "react";
import { postComment } from "./comment.api";

type Params = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const Comments = ({ motorcycleId, diagramId, partId }: Params) => {
    const { query } = useComments({ motorcycleId, diagramId, partId });
    const [newCommentText, setNewCommentText] = useState("");

    if (!query.data) {
        return (
            <div className="p-5 max-w-7xl mx-auto">
                <h1>Loading...</h1>
            </div>
        );
    }

    const comments = query.data;

    const handlePostComment = () => {
        // TODO: handle errors
        postComment(
            { motorcycleId, diagramId, partId },
            {
                text: newCommentText,
                motorcycleId,
                diagramId,
                partId,
            },
        );
    };

    return (
        <div className="p-5 flex flex-col gap-4 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
                <textarea
                    value={newCommentText}
                    onChange={(event) => setNewCommentText(event.target.value)}
                    className="w-full rounded-lg dark:bg-slate-800"
                    rows={4}
                    placeholder="Write comment"
                />
                <button
                    onClick={handlePostComment}
                    className="font-semibold px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:text-white dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 self-end"
                >
                    Post Comment
                </button>
            </div>
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="rounded-lg dark:bg-slate-800 p-5 flex flex-row gap-6"
                >
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                            />
                        </svg>
                        <div className="font-bold text-lg">0</div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4 items-center">
                            <Avatar name={comment.username} />
                            <div className="font-bold text-lg">
                                {comment.username}
                            </div>
                            <div>
                                {new Date(
                                    comment.createdAt,
                                ).toLocaleDateString()}
                            </div>
                        </div>
                        <div>{comment.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
