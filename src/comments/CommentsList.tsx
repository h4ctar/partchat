import { Loading } from "../Loading";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Comment } from "./Comment";
import { CommentSearchParams } from "./comment.api";
import { useComments } from "./comment.hooks";

type Props = CommentSearchParams;

export const CommentsList = ({ motorcycleId, diagramId, partId }: Props) => {
    const { query } = useComments({ motorcycleId, diagramId, partId });

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return <ErrorMessage error={query.error} />;
    }

    const comments = query.data;

    return (
        <ol className="flex flex-col gap-4">
            {comments.items.map((comment) => (
                <li key={comment.id}>
                    <Comment commentId={comment.id} />
                </li>
            ))}
        </ol>
    );
};
