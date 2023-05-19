import { useQuery } from "@tanstack/react-query";
import { CommentSearchParams, fetchComments } from "./comment.api";

export const useComments = (searchParams: CommentSearchParams) => {
    const query = useQuery({
        queryKey: ["comments", { searchParams }],
        queryFn: fetchComments(searchParams),
    });

    return {
        query,
    };
};
