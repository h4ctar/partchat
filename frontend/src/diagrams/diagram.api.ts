import type { DiagramResource } from "../../../types";
import { PartChatError } from "../ui/ErrorMessage";

export const fetchDiagrams = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/diagrams?motorcycleId=${motorcycleId}`);
    if (!response.ok) {
        throw new PartChatError("Failed to fetch diagrams");
    }

    const diagrams: DiagramResource[] = await response.json();
    return diagrams;
};

export const fetchDiagram = (diagramId: string) => async () => {
    const response = await fetch(`/api/diagrams/${diagramId}`);
    if (!response.ok) {
        throw new PartChatError("Failed to fetch diagram");
    }

    const diagrams: DiagramResource = await response.json();
    return diagrams;
};
