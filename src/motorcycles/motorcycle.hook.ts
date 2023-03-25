import { useQuery } from "@tanstack/react-query";
import { MotorcycleResource } from "../../types/motorcycles";

const fetchConfig = async () => {
    const response = await fetch("/api/config");
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
    const motorcycles: MotorcycleResource[] = await response.json();
    return motorcycles;
};

const fetchMotorcycle = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/motorcycles/${motorcycleId}`);
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
        queryKey: ["motorcycles", make, year],
        queryFn: fetchMotorcycles(make, year),
        keepPreviousData: true,
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
