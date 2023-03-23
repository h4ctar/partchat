import { useQuery } from "@tanstack/react-query";
import {
    DiagramResource,
    MotorcycleResource,
    PartResource,
} from "../../types/motorcycles";

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

const fetchDiagrams = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/diagrams?motorcycleId=${motorcycleId}`);
    const diagrams: DiagramResource[] = await response.json();
    return diagrams;
};

const fetchDiagram = (diagramId: string) => async () => {
    const response = await fetch(`/api/diagrams/${diagramId}`);
    const diagrams: DiagramResource = await response.json();
    return diagrams;
};

const fetchParts = (diagramId: string) => async () => {
    const response = await fetch(`/api/parts?diagramId=${diagramId}`);
    const diagrams: PartResource[] = await response.json();
    return diagrams;
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

export const useDiagrams = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["diagrams", motorcycleId],
        queryFn: fetchDiagrams(motorcycleId),
    });

    return {
        query,
    };
};

export const useDiagram = (diagramId: string) => {
    const query = useQuery({
        queryKey: ["diagram", diagramId],
        queryFn: fetchDiagram(diagramId),
    });

    return {
        query,
    };
};

export const useParts = (diagramId: string) => {
    const query = useQuery({
        queryKey: ["parts", diagramId],
        queryFn: fetchParts(diagramId),
    });

    return {
        query,
    };
};
