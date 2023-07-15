import { useMutation, useQuery } from "@tanstack/react-query";
import {
    CommentSearchParams,
    deleteComment,
    fetchComments,
    postComment,
} from "./comment.api";
import { queryClient } from "../query";
import { useAuth0 } from "@auth0/auth0-react";
import { Descendant } from "slate";

export const useComments = (searchParams: CommentSearchParams) => {
    const { getAccessTokenSilently } = useAuth0();

    const query = useQuery({
        queryKey: ["comments", { searchParams }],
        queryFn: fetchComments(searchParams),
    });

    const postCommentMutation = useMutation({
        mutationFn: (nodes: Descendant[]) =>
            postComment(searchParams, nodes, getAccessTokenSilently),
        onSuccess: async () => {
            // TODO: clear editor on success
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return {
        query,
        postCommentMutation,
    };
};

export const useComment = (commentId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const deleteCommentMutation = useMutation({
        mutationFn: () => deleteComment(commentId, getAccessTokenSilently),
        onSuccess: async () => {
            queryClient.removeQueries(["comments", commentId]);
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return {
        deleteComment: deleteCommentMutation,
    };
};
