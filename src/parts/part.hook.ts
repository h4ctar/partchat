import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { PartReferenceResource, PartResource } from "../../types/motorcycles";
import { queryClient } from "../query";
import { fetchParts, updatePartReference } from "./part.api";

export const useParts = (diagramId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const query = useQuery({
        queryKey: ["parts", diagramId],
        queryFn: fetchParts(diagramId),
    });

    const mutation = useMutation({
        mutationFn: (partReference: PartReferenceResource) =>
            updatePartReference(partReference, getAccessTokenSilently),

        onMutate: async (partReference: PartReferenceResource) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ["parts", diagramId],
            });

            // Snapshot the previous value
            const previousParts = queryClient.getQueryData<PartResource[]>([
                "parts",
                diagramId,
            ]);

            // Optimistically update to the new value
            queryClient.setQueryData(
                ["parts", diagramId],
                (parts?: PartResource[]) => {
                    return _.map(parts, (p) =>
                        p.id === partReference.partId
                            ? {
                                  ...p,
                                  hotspots: partReference.hotspots,
                                  refNo: partReference.refNo,
                                  qty: partReference.qty,
                              }
                            : p,
                    );
                },
            );

            // Return a context object with the snapshotted value
            return { previousParts };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _newPartReference, context) => {
            queryClient.setQueryData(
                ["parts", diagramId],
                context?.previousParts,
            );
        },

        onSuccess: async () =>
            queryClient.invalidateQueries({
                queryKey: ["parts", diagramId],
            }),
    });

    return {
        query,
        mutation,
    };
};
