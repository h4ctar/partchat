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

export const useFetchComments = (searchParams: CommentSearchParams) => {
    const query = useQuery({
        queryKey: ["comments", { searchParams }],
        queryFn: fetchComments(searchParams),
    });

    return query;
};

export const useCreateComment = (searchParams: CommentSearchParams) => {
    const { getAccessTokenSilently } = useAuth0();

    const mutation = useMutation({
        mutationFn: (nodes: Descendant[]) =>
            postComment(searchParams, nodes, getAccessTokenSilently),
        onSuccess: async () => {
            // TODO: clear editor on success
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return mutation;
};

export const useDeleteComment = (commentId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const mutation = useMutation({
        mutationFn: () => deleteComment(commentId, getAccessTokenSilently),
        onSuccess: async () => {
            queryClient.removeQueries(["comments", commentId]);
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return mutation;
};
