import Avatar from "boring-avatars";
import { CommentResource } from "../../types/motorcycles";

type Props = {
    comment: CommentResource;
};

export const Comment = ({ comment }: Props) => {
    return (
        <div className="flex flex-row gap-6 rounded-lg p-5 dark:bg-slate-800">
            <div className="flex flex-col items-center gap-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                </svg>
                <div className="text-lg font-bold">0</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    />
                </svg>
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
