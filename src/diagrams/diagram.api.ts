import { DiagramResource } from "../../types/motorcycles";

export const fetchDiagrams = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/diagrams?motorcycleId=${motorcycleId}`);
    const diagrams: DiagramResource[] = await response.json();
    return diagrams;
};

export const fetchDiagram = (diagramId: string) => async () => {
    const response = await fetch(`/api/diagrams/${diagramId}`);
    const diagrams: DiagramResource = await response.json();
    return diagrams;
};

export const updateDiagram = async (
    diagram: DiagramResource,
    getAccessTokenSilently: () => Promise<string>,
) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`/api/diagrams/${diagram.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(diagram),
    });
    if (!response.ok) {
        throw new Error("Failed to update diagram");
    }
};
