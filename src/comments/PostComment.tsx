import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Descendant } from "slate";
import { queryClient } from "../query";
import { RichEditor } from "../ui/rich-editor/RichEditor";
import { postComment } from "./comment.api";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const PostComment = ({ motorcycleId, diagramId, partId }: Props) => {
    const [text, setText] = useState<Descendant[]>([]);
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
            // setText("");
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <RichEditor placeholder="Write comment">
                <button
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isLoading || !text}
                    className="dark:highlight-white/20 h-12 rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:bg-slate-300 disabled:text-slate-400 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:dark:bg-slate-600 disabled:dark:text-slate-500"
                >
                    Post comment
                </button>
            </RichEditor>
        </div>
    );
};
