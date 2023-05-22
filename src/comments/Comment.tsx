import Avatar from "boring-avatars";
import { Loading } from "../Loading";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RichHtml } from "../ui/rich-editor/RichHtml";
import { useComment } from "./comment.hooks";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../query";
import { deleteComment } from "./comment.api";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
    commentId: number;
};

export const Comment = ({ commentId }: Props) => {
    const { query } = useComment(commentId);
    const { getAccessTokenSilently } = useAuth0();

    const mutation = useMutation({
        mutationFn: () => deleteComment(commentId, getAccessTokenSilently),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return <ErrorMessage error={query.error} />;
    }

    const comment = query.data;

    return (
        <div className="dark:highlight-white/10 relative z-10 flex flex-row flex-wrap gap-4 rounded-lg bg-white p-5 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800">
            <div className="flex flex-grow flex-row items-center gap-4">
                <Avatar name={comment.username} />
                <div>
                    <div className="text-lg font-bold">{comment.username}</div>
                    <div className="text-xs">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
            {mutation.isError && <ErrorMessage error={mutation.error} />}
            <div className="flex flex-row items-center gap-4">
                <button>
                    <PencilIcon />
                </button>
                <button onClick={() => mutation.mutate()}>
                    <TrashIcon />
                </button>
                <button>
                    <UpArrowIcon />
                </button>
                <div className="text-lg font-bold">0</div>
                <button>
                    <DownArrowIcon />
                </button>
            </div>
            <div className="w-full">
                <div className="prose prose-sm dark:prose-invert md:prose-base">
                    {comment.nodes.map((node, index) => (
                        <RichHtml key={index} node={node} />
                    ))}
                </div>
            </div>
        </div>
    );
};
