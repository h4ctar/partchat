import { useQuery } from "@tanstack/react-query";
import { CommentResource } from "../../types/motorcycles";

const fetchComments =
    ({
        motorcycleId,
        diagramId,
        partId,
    }: {
        motorcycleId?: string;
        diagramId?: string;
        partId?: string;
    }) =>
    async () => {
        const search = new URLSearchParams();
        if (motorcycleId) {
            search.append("motorcycleId", motorcycleId);
        }
        if (diagramId) {
            search.append("diagramId", diagramId);
        }
        if (partId) {
            search.append("partId", partId);
        }

        const response = await fetch(`/api/comments?${search.toString()}`);
        const comments: CommentResource[] = await response.json();
        return comments;
    };

const fetchComment = (commentId: string) => async () => {
    const response = await fetch(`/api/comments/${commentId}`);
    const comments: CommentResource = await response.json();
    return comments;
};

export const useComments = ({
    motorcycleId,
    diagramId,
    partId,
}: {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
}) => {
    const query = useQuery({
        queryKey: ["comments", motorcycleId, diagramId, partId],
        queryFn: fetchComments({
            motorcycleId,
            diagramId,
            partId,
        }),
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
