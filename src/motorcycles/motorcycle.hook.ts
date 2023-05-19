import { useQuery } from "@tanstack/react-query";
import { MotorcycleResource } from "../../types/motorcycles";
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

const fetchMotorcycles = (make?: string, year?: number) => async () => {
    const search = new URLSearchParams();
    if (make) {
        search.append("make", make);
    }
    if (year) {
        search.append("year", year.toFixed());
    }
    const response = await fetch(`/api/motorcycles?${search.toString()}`);
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

export const useMotorcycles = (make?: string, year?: number) => {
    const query = useQuery({
        queryKey: ["motorcycles", { make, year }],
        queryFn: fetchMotorcycles(make, year),
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
