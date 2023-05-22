import { useMutation, useQuery } from "@tanstack/react-query";
import {
    CommentSearchParams,
    fetchComment,
    fetchComments,
} from "./comment.api";

export const useComments = (searchParams: CommentSearchParams) => {
    const query = useQuery({
        queryKey: ["comments", { searchParams }],
        queryFn: fetchComments(searchParams),
    });

    return {
        query,
    };
};

export const useComment = (commentId: number) => {
    const query = useQuery({
        queryKey: ["comments", commentId],
        queryFn: fetchComment(commentId),
    });

    // const mutate = useMutation()

    return {
        query,
    };
};
