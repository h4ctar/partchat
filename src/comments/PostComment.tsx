import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../query";
import { postComment } from "./comment.api";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const PostComment = ({ motorcycleId, diagramId, partId }: Props) => {
    const [text, setText] = useState("");
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const mutation = useMutation({
        mutationFn: () =>
            postComment(
                { motorcycleId, diagramId, partId },
                {
                    text,
                    motorcycleId,
                    diagramId,
                    partId,
                },
                getAccessTokenSilently,
            ),
        onSuccess: async () => {
            setText("");
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

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
                disabled={!isAuthenticated || mutation.isLoading}
            />
            <div className="flex flex-row-reverse items-center justify-between">
                <button
                    onClick={() => mutation.mutate()}
                    disabled={!isAuthenticated || mutation.isLoading || !text}
                    className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:bg-slate-300 disabled:text-slate-400 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:dark:bg-slate-600 disabled:dark:text-slate-500 sm:w-auto"
                >
                    {isAuthenticated ? "Post comment" : "Log in to comment"}
                </button>
                {mutation.isLoading && (
                    <div className="text-slate-300">Posting comment...</div>
                )}
                {mutation.isError && (
                    <div className="text-red-500">
                        Failed to post new comment
                    </div>
                )}
                {mutation.isSuccess && (
                    <div className="text-sky-600 dark:text-sky-400">
                        Successfully posted a new comment
                    </div>
                )}
            </div>
        </div>
    );
};
