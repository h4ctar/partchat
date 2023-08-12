import { Descendant } from "slate";
import type { CommentResource, PostComment } from "../../../types";
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
    nodes: Descendant[],
    token?: string,
) => {
    const comment: PostComment = {
        nodes,
        ...searchParams,
    };

    const search = new URLSearchParams(searchParams).toString();

    const response = await fetch(`/api/comments?${search}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to post comment");
    }
};

export const fetchComment = (commentId: string) => async () => {
    const response = await fetch(`/api/comments/${commentId}`);
    if (!response.ok) {
        throw new PartChatError("Failed to get comment");
    }

    const comment: CommentResource = await response.json();
    return comment;
};

export const deleteComment = async (
    commentId: string,
    token?: string,
) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new PartChatError("Failed to delete comment");
    }
};
