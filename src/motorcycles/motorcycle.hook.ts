import { useQuery } from "@tanstack/react-query";

// TODO: zod
type Motorcycle = {
    id: string;
    make: string;
    yearFrom: number;
    yearTo: number;
    model: string;
    image: string;
};

type Diagram = {
    id: string;
    name: string;
    image: string;
};

type Part = {
    id: string;
    number: string;
    description: string;
    qty: number;
    refNo?: number;
};

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
    const motorcycles: Motorcycle[] = await response.json();
    return motorcycles;
};

const fetchMotorcycle = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/motorcycles/${motorcycleId}`);
    const motorcycles: Motorcycle = await response.json();
    return motorcycles;
};

const fetchDiagrams = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/motorcycles/${motorcycleId}/diagrams`);
    const diagrams: Diagram[] = await response.json();
    return diagrams;
};

const fetchDiagram = (motorcycleId: string, diagramId: string) => async () => {
    const response = await fetch(
        `/api/motorcycles/${motorcycleId}/diagrams/${diagramId}`
    );
    const diagrams: Diagram = await response.json();
    return diagrams;
};

const fetchParts = (motorcycleId: string, diagramId: string) => async () => {
    const response = await fetch(
        `/api/motorcycles/${motorcycleId}/diagrams/${diagramId}/parts`
    );
    const diagrams: Part[] = await response.json();
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
        queryKey: ["motorcycles", motorcycleId, "diagrams"],
        queryFn: fetchDiagrams(motorcycleId),
    });

    return {
        query,
    };
};

export const useDiagram = (motorcycleId: string, diagramId: string) => {
    const query = useQuery({
        queryKey: ["motorcycles", motorcycleId, "diagrams", diagramId],
        queryFn: fetchDiagram(motorcycleId, diagramId),
    });

    return {
        query,
    };
};

export const useParts = (motorcycleId: string, diagramId: string) => {
    const query = useQuery({
        queryKey: ["motorcycles", motorcycleId, "diagrams", diagramId, "parts"],
        queryFn: fetchParts(motorcycleId, diagramId),
    });

    return {
        query,
    };
};
