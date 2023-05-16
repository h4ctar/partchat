import Avatar from "boring-avatars";
import { CommentResource } from "../../types/motorcycles";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { RichHtml } from "../ui/rich-editor/RichHtml";

type Props = {
    comment: CommentResource;
};

export const Comment = ({ comment }: Props) => {
    return (
        <div className="dark:highlight-white/10 relative z-10 flex flex-col gap-6 rounded-lg bg-white p-5 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 md:flex-row">
            <div className="flex flex-grow flex-col gap-4 md:order-2">
                <div className="flex flex-row items-center gap-4">
                    <Avatar name={comment.username} />
                    <div className="text-lg font-bold">{comment.username}</div>
                    <div>
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div className="prose prose-sm dark:prose-invert md:prose-base">
                    {comment.nodes.map((node, index) => (
                        <RichHtml key={index} node={node} />
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 md:flex-col">
                <UpArrowIcon />
                <div className="text-lg font-bold">0</div>
                <DownArrowIcon />
            </div>
        </div>
    );
};
