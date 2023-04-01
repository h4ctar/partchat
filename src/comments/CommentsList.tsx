import { Comment } from "./Comment";
import { useComments } from "./comment.hooks";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const CommentsList = ({ motorcycleId, diagramId, partId }: Props) => {
    const { query } = useComments({ motorcycleId, diagramId, partId });

    if (!query.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const comments = query.data;

    return (
        <>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
};
