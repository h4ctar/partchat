import Avatar from "boring-avatars";
import { CommentResource } from "../../types/motorcycles";
import { DownArrow } from "../icons/DownArrow";
import { UpArrow } from "../icons/UpArrow";

type Props = {
    comment: CommentResource;
};

export const Comment = ({ comment }: Props) => {
    return (
        <div className="flex flex-row gap-6 rounded-lg p-5 dark:bg-slate-800">
            <div className="flex flex-col items-center gap-4">
                <UpArrow />
                <div className="text-lg font-bold">0</div>
                <DownArrow />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                    <Avatar name={comment.username} />
                    <div className="text-lg font-bold">{comment.username}</div>
                    <div>
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div>{comment.text}</div>
            </div>
        </div>
    );
};
