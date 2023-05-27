import Avatar from "boring-avatars";
import { Loading } from "../Loading";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RichHtml } from "../ui/rich-editor/RichHtml";
import { useComment } from "./comment.hooks";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
    commentId: number;
};

export const Comment = ({ commentId }: Props) => {
    const { user } = useAuth0();
    const { query, deleteComment } = useComment(commentId);

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return <ErrorMessage error={query.error} />;
    }

    const comment = query.data;
    console.log(JSON.stringify(user));
    return (
        <>
            {deleteComment.isError && (
                <ErrorMessage error={deleteComment.error} />
            )}
            <div className="dark:highlight-white/10 relative z-10 flex flex-row flex-wrap gap-4 rounded-lg bg-white p-5 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800">
                <div className="flex flex-grow flex-row items-center gap-4">
                    <Avatar name={comment.username} />
                    <div>
                        <div className="text-lg font-bold">
                            {comment.username}
                        </div>
                        <div className="text-xs">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    {comment.username === user?.preferred_username && (
                        <>
                            {" "}
                            <button>
                                <PencilIcon />
                            </button>
                            <button onClick={() => deleteComment.mutate()}>
                                <TrashIcon />
                            </button>
                        </>
                    )}
                    <button
                        disabled={comment.username === user?.preferred_username}
                    >
                        <UpArrowIcon />
                    </button>
                    <div className="text-lg font-bold">0</div>
                    <button
                        disabled={comment.username === user?.preferred_username}
                    >
                        <DownArrowIcon />
                    </button>
                </div>
                <div className="w-full">
                    <div className="prose prose-sm max-w-none dark:prose-invert md:prose-base">
                        {comment.nodes.map((node, index) => (
                            <RichHtml key={index} node={node} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
