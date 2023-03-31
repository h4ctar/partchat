import { CommentResource, PostComment } from "../../types/motorcycles";
import { queryClient } from "../query";

export type CommentSearchParams = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const fetchComments =
    (searchParams: CommentSearchParams) => async () => {
        const search = new URLSearchParams();
        if (searchParams.motorcycleId) {
            search.append("motorcycleId", searchParams.motorcycleId);
        }
        if (searchParams.diagramId) {
            search.append("diagramId", searchParams.diagramId);
        }
        if (searchParams.partId) {
            search.append("partId", searchParams.partId);
        }

        const response = await fetch(`/api/comments?${search.toString()}`);
        const comments: CommentResource[] = await response.json();
        return comments;
    };

export const postComment = async (
    searchParams: CommentSearchParams,
    comment: PostComment,
) => {
    const search = new URLSearchParams(searchParams).toString();
    await fetch(`/api/comments?${search}`, {
        method: "POST",
        body: JSON.stringify(comment),
    });
    await queryClient.invalidateQueries({
        queryKey: ["comments"],
    });
};