import { useComments } from "./comment.hooks";
import Avatar from "boring-avatars";

type Params = {
    diagramId: string;
};

export const Comments = ({ diagramId }: Params) => {
    const { query } = useComments({ diagramId });

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const comments = query.data;

    return (
        <div className="p-5 flex flex-col gap-4 max-w-7xl mx-auto">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="rounded-lg dark:bg-slate-800 p-5 flex flex-row gap-6"
                >
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                            />
                        </svg>
                        <div className="font-bold text-lg">0</div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4 items-center">
                            <Avatar name={comment.username} />
                            <div className="font-bold text-lg">
                                {comment.username}
                            </div>
                            <div>
                                {new Date(
                                    comment.postedDate
                                ).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="font-bold text-xl">{comment.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
