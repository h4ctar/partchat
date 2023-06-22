import { useQuery } from "@tanstack/react-query";
import { fetchDiagram, fetchDiagrams } from "./diagram.api";

export const useDiagrams = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["diagrams", { motorcycleId }],
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
