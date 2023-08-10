import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createDiagram,
    deleteDiagram,
    fetchDiagram,
    fetchDiagrams,
    updateDiagram,
} from "./diagram.api";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "wouter";
import { PostDiagram } from "@partchat/types";
import { queryClient } from "../query";

export const useFetchDiagrams = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["diagrams", { motorcycleId }],
        queryFn: fetchDiagrams(motorcycleId),
    });

    return query;
};

export const useFetchDiagram = (diagramId: string) => {
    const query = useQuery({
        queryKey: ["diagram", diagramId],
        queryFn: fetchDiagram(diagramId),
    });

    return query;
};

export const useCreateDiagram = (motorcycleId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            postDiagram,
            image,
        }: {
            postDiagram: PostDiagram;
            image?: File;
        }) => createDiagram(postDiagram, image, getAccessTokenSilently),
        onSuccess: async (diagram) => {
            queryClient.invalidateQueries({
                queryKey: ["diagrams"],
            });
            setLocation(`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`);
        },
    });

    return mutation;
};

export const useUpdateDiagram = (motorcycleId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            diagramId,
            postDiagram,
            image,
        }: {
            diagramId: string;
            postDiagram: PostDiagram;
            image?: File;
        }) =>
            updateDiagram(
                diagramId,
                postDiagram,
                image,
                getAccessTokenSilently,
            ),
        onSuccess: async (diagram) => {
            queryClient.invalidateQueries({
                queryKey: ["diagrams"],
            });
            queryClient.invalidateQueries({
                queryKey: ["diagram", diagram.id],
            });
            setLocation(`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`);
        },
    });

    return mutation;
};

export const useDeleteDiagram = (motorcycleId: string, diagramId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: () => deleteDiagram(diagramId, getAccessTokenSilently),
        onSuccess: async () => {
            queryClient.removeQueries(["diagrams", diagramId]);
            queryClient.invalidateQueries({
                queryKey: ["diagrams"],
            });
            setLocation(`/motorcycles/${motorcycleId}`);
        },
    });

    return mutation;
};
