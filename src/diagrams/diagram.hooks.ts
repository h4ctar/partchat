import { useQuery } from "@tanstack/react-query";
import { DiagramResource } from "../../types/motorcycles";

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
