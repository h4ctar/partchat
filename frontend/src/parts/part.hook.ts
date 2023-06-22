import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import type { PartReferenceResource, PartResource } from "../../../types";
import { CommentSearchParams } from "../comments/comment.api";
import { queryClient } from "../query";
import { fetchParts, updatePartReference } from "./part.api";

export const useParts = (searchParams: CommentSearchParams) => {
    const { getAccessTokenSilently } = useAuth0();

    const query = useQuery({
        queryKey: ["parts", searchParams],
        queryFn: fetchParts(searchParams),
    });

    const updatePartReferenceMutation = useMutation({
        mutationFn: (partReference: PartReferenceResource) =>
            updatePartReference(partReference, getAccessTokenSilently),

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

    return {
        query,
        updatePartReference: updatePartReferenceMutation,
    };
};
