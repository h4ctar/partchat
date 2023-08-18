import { PostDiagram } from "@partchat/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useLocation } from "wouter";
import { queryClient } from "../query";
import {
    createDiagram,
    deleteDiagram,
    fetchDiagram,
    fetchDiagrams,
    updateDiagram,
} from "./diagram.api";

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
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            postDiagram,
            image,
        }: {
            postDiagram: PostDiagram;
            image?: File;
        }) => createDiagram(postDiagram, image, user?.access_token),
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
    const { user } = useAuth();
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
        }) => updateDiagram(diagramId, postDiagram, image, user?.access_token),
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
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: () => deleteDiagram(diagramId, user?.access_token),
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
