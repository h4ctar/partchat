import type { MotorcycleResource } from "@partchat/types";
import { useQuery } from "@tanstack/react-query";
import { PartChatError } from "../ui/ErrorMessage";

const fetchConfig = async () => {
    const response = await fetch("/api/config");
    if (!response.ok) {
        throw new PartChatError("Failed to fetch config");
    }

    const config: {
        [make: string]: { [year: number]: { [model: string]: string } };
    } = await response.json();
    return config;
};

const fetchMotorcycles = () => async () => {
    const response = await fetch("/api/motorcycles");
    if (!response.ok) {
        throw new PartChatError("Failed to fetch motorcycles");
    }

    const motorcycles: MotorcycleResource[] = await response.json();
    return motorcycles;
};

const fetchMotorcycle = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/motorcycles/${motorcycleId}`);
    if (!response.ok) {
        throw new PartChatError("Failed to fetch motorcycle");
    }

    const motorcycles: MotorcycleResource = await response.json();
    return motorcycles;
};

export const useConfig = () => {
    const query = useQuery({
        queryKey: ["config"],
        queryFn: fetchConfig,
    });

    return { query };
};

export const useMotorcycles = () => {
    const query = useQuery({
        queryKey: ["motorcycles"],
        queryFn: fetchMotorcycles(),
    });

    return {
        query,
    };
};

export const useMotorcycle = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["motorcycle", motorcycleId],
        queryFn: fetchMotorcycle(motorcycleId),
    });

    return {
        query,
    };
};
