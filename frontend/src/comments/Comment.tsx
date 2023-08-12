import { CommentResource } from "@partchat/types";
import Avatar from "boring-avatars";
import { Descendant } from "slate";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RichHtml } from "../ui/rich-editor/RichHtml";
import { useDeleteComment } from "./comment.hooks";
import { useAuth } from "react-oidc-context";

type Props = {
    comment: CommentResource;
};

export const Comment = ({ comment }: Props) => {
    const { user } = useAuth();
    const deleteComment = useDeleteComment(comment.id);

    const onDeleteClick = () => {
        if (confirm(`Are you sure you want to delete this comment?`) == true) {
            deleteComment.mutate();
        }
    };

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
                    {comment.username === user?.profile.preferred_username && (
                        <>
                            {" "}
                            <button name="edit">
                                <PencilIcon />
                            </button>
                            <button onClick={onDeleteClick} aria-label="delete">
                                <TrashIcon />
                            </button>
                        </>
                    )}
                    <button
                        disabled={comment.username === user?.profile.preferred_username}
                        name="up-vote"
                    >
                        <UpArrowIcon />
                    </button>
                    <div className="text-lg font-bold">0</div>
                    <button
                        disabled={comment.username === user?.profile.preferred_username}
                        name="down-vote"
                    >
                        <DownArrowIcon />
                    </button>
                </div>
                <div className="w-full">
                    <div className="prose prose-sm dark:prose-invert md:prose-base max-w-none">
                        {comment.nodes.map((node, index) => (
                            <RichHtml key={index} node={node as Descendant} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
