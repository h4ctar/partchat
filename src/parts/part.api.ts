import { PartReferenceResource, PartResource } from "../../types/motorcycles";

export const fetchParts = (diagramId: string) => async () => {
    const response = await fetch(`/api/parts?diagramId=${diagramId}`);
    const diagrams: PartResource[] = await response.json();
    return diagrams;
};

export const updatePartReference = async (
    partReference: PartReferenceResource,
    getAccessTokenSilently: () => Promise<string>,
) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(
        `/api/diagrams/${partReference.diagramId}/part-references/${partReference.partId}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(partReference),
        },
    );
    if (!response.ok) {
        throw new Error("Failed to update part reference");
    }
};
