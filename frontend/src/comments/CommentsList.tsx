import { Loading } from "../ui/Loading";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Comment } from "./Comment";
import { CommentSearchParams } from "./comment.api";
import { useFetchComments } from "./comment.hooks";

type Props = CommentSearchParams;

export const CommentsList = ({ motorcycleId, diagramId, partId }: Props) => {
    const fetchComments = useFetchComments({ motorcycleId, diagramId, partId });

    if (fetchComments.isLoading) {
        return <Loading />;
    }

    if (fetchComments.isError) {
        return <ErrorMessage error={fetchComments.error} />;
    }

    const comments = fetchComments.data!;

    return (
        <ol className="flex flex-col gap-4">
            {comments.map((comment) => (
                <li key={comment.id}>
                    <Comment comment={comment} />
                </li>
            ))}
        </ol>
    );
};
