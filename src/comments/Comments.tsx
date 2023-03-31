import { Comment } from "./Comment";
import { useComments } from "./comment.hooks";
import { PostComment } from "./PostComment";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const Comments = ({ motorcycleId, diagramId, partId }: Props) => {
    const { query } = useComments({ motorcycleId, diagramId, partId });

    if (!query.data) {
        return (
            <div className="p-5 max-w-7xl mx-auto">
                <h1>Loading...</h1>
            </div>
        );
    }

    const comments = query.data;

    return (
        <div className="p-5 flex flex-col gap-4 max-w-7xl mx-auto">
            <PostComment
                motorcycleId={motorcycleId}
                diagramId={diagramId}
                partId={partId}
            />
            {comments.map((comment) => (
                <Comment comment={comment} />
            ))}
        </div>
    );
};
