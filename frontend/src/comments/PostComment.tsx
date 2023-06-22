import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Descendant } from "slate";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RichEditor } from "../ui/rich-editor/RichEditor";
import { CommentSearchParams } from "./comment.api";
import { useComments } from "./comment.hooks";

type Props = CommentSearchParams;

export const PostComment = (searchParams: Props) => {
    const { isAuthenticated } = useAuth0();
    const [nodes, setNodes] = useState<Descendant[]>([]);
    const { postCommentMutation } = useComments(searchParams);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            {postCommentMutation.isError && (
                <ErrorMessage error={postCommentMutation.error} />
            )}
            <RichEditor placeholder="Write comment" onChange={setNodes}>
                <button
                    onClick={() => postCommentMutation.mutate(nodes)}
                    disabled={
                        postCommentMutation.isLoading || nodes.length === 0
                    }
                    className="dark:highlight-white/20 h-12 rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:bg-slate-300 disabled:text-slate-400 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:dark:bg-slate-600 disabled:dark:text-slate-500"
                >
                    Post comment
                </button>
            </RichEditor>
        </div>
    );
};
