import Avatar from "boring-avatars";
import { CommentResource } from "../../types/motorcycles";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { RichHtml } from "../ui/rich-editor/RichHtml";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";

type Props = {
    comment: CommentResource;
};

export const Comment = ({ comment }: Props) => {
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
            <div className="flex flex-row items-center gap-4">
                <button>
                    <PencilIcon />
                </button>
                <button>
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
