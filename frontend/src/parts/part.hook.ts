import type { PartReferenceResource, PartResource } from "@partchat/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useAuth } from "react-oidc-context";
import { CommentSearchParams } from "../comments/comment.api";
import { queryClient } from "../query";
import { fetchParts, updatePartReference } from "./part.api";

export const useFetchParts = (searchParams: CommentSearchParams) => {
    const query = useQuery({
        queryKey: ["parts", searchParams],
        queryFn: fetchParts(searchParams),
    });

    return query;
};

export const useUpdatePartReferences = (searchParams: CommentSearchParams) => {
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: (partReference: PartReferenceResource) =>
            updatePartReference(partReference, user?.access_token),

        onMutate: async (partReference: PartReferenceResource) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ["parts"],
            });

            // Snapshot the previous value
            const previousParts = queryClient.getQueryData<PartResource[]>([
                "parts",
                searchParams,
            ]);

            // Optimistically update to the new value
            queryClient.setQueryData(
                ["parts", searchParams],
                (parts?: PartResource[]) =>
                    _.map(parts, (p) =>
                        p.id === partReference.partId
                            ? {
                                  ...p,
                                  hotspots: partReference.hotspots,
                                  refNo: partReference.refNo,
                                  qty: partReference.qty,
                              }
                            : p,
                    ),
            );

            // Return a context object with the snapshotted value
            return { previousParts };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _newPartReference, context) => {
            queryClient.setQueryData(
                ["parts", searchParams],
                context?.previousParts,
            );
        },

        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["parts", searchParams],
            });
        },
    });

    return mutation;
};
