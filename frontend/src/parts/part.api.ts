import type { PartReferenceResource, PartResource } from "@partchat/types";
import { PartChatError } from "../ui/ErrorMessage";

export type PartSearchParams = {
    diagramId?: string;
};

export const fetchParts = (searchParams: PartSearchParams) => async () => {
    const search = new URLSearchParams();
    if (searchParams.diagramId) {
        search.append("diagramId", searchParams.diagramId);
    }

    const response = await fetch(`/api/parts?${search.toString()}`);
    if (!response.ok) {
        throw new PartChatError("Failed to fetch parts");
    }

    const parts: PartResource[] = await response.json();
    return parts;
};

export const updatePartReference = async (
    partReference: PartReferenceResource,
    token?: string,
) => {
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
