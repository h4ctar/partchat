import { PostMotorcycle } from "@partchat/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { queryClient } from "../query";
import {
    createMotorcycle,
    deleteMotorcycle,
    fetchMotorcycle,
    fetchMotorcycles,
    updateMotorcycle,
} from "./motorcycle.api";
import { useAuth } from "react-oidc-context";

export const useFetchMotorcycles = () => {
    const query = useQuery({
        queryKey: ["motorcycles"],
        queryFn: fetchMotorcycles,
    });

    return query;
};

export const useFetchMotorcycle = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["motorcycle", motorcycleId],
        queryFn: fetchMotorcycle(motorcycleId),
    });

    return query;
};

export const useCreateMotorcycle = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            postMotorcycle,
            image,
        }: {
            postMotorcycle: PostMotorcycle;
            image?: File;
        }) => createMotorcycle(postMotorcycle, image, user?.access_token),
        onSuccess: async (motorcycle) => {
            queryClient.invalidateQueries({
                queryKey: ["motorcycles"],
            });
            setLocation(`/motorcycles/${motorcycle.id}`);
        },
    });

    return mutation;
};

export const useUpdateMotorcycle = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            motorcycleId,
            postMotorcycle,
            image,
        }: {
            motorcycleId: string;
            postMotorcycle: PostMotorcycle;
            image?: File;
        }) =>
            updateMotorcycle(
                motorcycleId,
                postMotorcycle,
                image,
                user?.access_token,
            ),
        onSuccess: async (motorcycle) => {
            queryClient.invalidateQueries({
                queryKey: ["motorcycles"],
            });
            queryClient.invalidateQueries({
                queryKey: ["motorcycle", motorcycle.id],
            });
            setLocation(`/motorcycles/${motorcycle.id}`);
        },
    });

    return mutation;
};

export const useDeleteMotorcycle = (motorcycleId: string) => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: () => deleteMotorcycle(motorcycleId, user?.access_token),
        onSuccess: async () => {
            queryClient.removeQueries(["motorcycles", motorcycleId]);
            queryClient.invalidateQueries({
                queryKey: ["motorcycles"],
            });
            setLocation("/motorcycles");
        },
    });

    return mutation;
};
