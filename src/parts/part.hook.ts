import { useQuery } from "@tanstack/react-query";
import { PartResource } from "../../types/motorcycles";

const fetchParts = (diagramId: string) => async () => {
    const response = await fetch(`/api/parts?diagramId=${diagramId}`);
    const diagrams: PartResource[] = await response.json();
    return diagrams;
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
