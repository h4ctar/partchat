import { useQuery } from "@tanstack/react-query";
import { CommentResource } from "../../types/motorcycles";

const fetchComments =
    ({ diagramId, commentId }: { diagramId?: string; commentId?: string }) =>
    async () => {
        if (diagramId) {
            const response = await fetch(
                `/api/comments?diagramId=${diagramId}`
            );
            const comments: CommentResource[] = await response.json();
            return comments;
        } else if (commentId) {
            const response = await fetch(
                `/api/comments?commentId=${commentId}`
            );
            const comments: CommentResource[] = await response.json();
            return comments;
        } else {
            return [];
        }
    };

const fetchComment = (commentId: string) => async () => {
    const response = await fetch(`/api/comments/${commentId}`);
    const comments: CommentResource = await response.json();
    return comments;
};

export const useComments = (params: {
    diagramId?: string;
    commentId?: string;
}) => {
    const query = useQuery({
        queryKey: ["comments", params.diagramId || params.commentId],
        queryFn: fetchComments(params),
    });

    return {
        query,
    };
};

export const useComment = (commentId: string) => {
    const query = useQuery({
        queryKey: ["comment", commentId],
        queryFn: fetchComment(commentId),
    });

    return {
        query,
    };
};
