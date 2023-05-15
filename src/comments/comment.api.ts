import { CommentResource, PostComment } from "../../types/motorcycles";
import { PartChatError } from "../ui/ErrorMessage";

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
        if (!response.ok) {
            throw new PartChatError("Failed to fetch comments");
        }

        const comments: CommentResource[] = await response.json();
        return comments;
    };

export const postComment = async (
    searchParams: CommentSearchParams,
    comment: PostComment,
    getAccessTokenSilently: () => Promise<string>,
) => {
    const token = await getAccessTokenSilently();
    const search = new URLSearchParams(searchParams).toString();
    
    const response = await fetch(`/api/comments?${search}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to post comment");
    }
};
