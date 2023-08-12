import { useMutation, useQuery } from "@tanstack/react-query";
import {
    CommentSearchParams,
    deleteComment,
    fetchComments,
    postComment,
} from "./comment.api";
import { queryClient } from "../query";
import { Descendant } from "slate";
import { useAuth } from "react-oidc-context";

export const useFetchComments = (searchParams: CommentSearchParams) => {
    const query = useQuery({
        queryKey: ["comments", { searchParams }],
        queryFn: fetchComments(searchParams),
    });

    return query;
};

export const useCreateComment = (searchParams: CommentSearchParams) => {
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: (nodes: Descendant[]) =>
            postComment(searchParams, nodes, user?.access_token),
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
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: () => deleteComment(commentId, user?.access_token),
        onSuccess: async () => {
            queryClient.removeQueries(["comments", commentId]);
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return mutation;
};
