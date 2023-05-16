import { Loading } from "../Loading";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Comment } from "./Comment";
import { useComments } from "./comment.hooks";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

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
        <>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
};
