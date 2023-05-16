import { PartReferenceResource, PartResource } from "../../types/motorcycles";
import { PartChatError } from "../ui/ErrorMessage";

export const fetchParts = (diagramId: string) => async () => {
    const response = await fetch(`/api/parts?diagramId=${diagramId}`);
    if (!response.ok) {
        throw new PartChatError("Failed to fetch parts");
    }

    const parts: PartResource[] = await response.json();
    return parts;
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
        throw new PartChatError("Failed to update part reference");
    }
};
