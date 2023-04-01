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
            <div className="mx-auto max-w-7xl p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const comments = query.data;

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-5">
            <PostComment
                motorcycleId={motorcycleId}
                diagramId={diagramId}
                partId={partId}
            />
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};
