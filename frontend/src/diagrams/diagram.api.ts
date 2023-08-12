import type { DiagramResource, PostDiagram } from "@partchat/types";
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

export const createDiagram = async (
    postDiagram: PostDiagram,
    image: File | undefined,
    token?: string,
): Promise<DiagramResource> => {
    const response = await fetch(`/api/diagrams`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postDiagram),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to create diagram");
    }
    const diagram: DiagramResource = await response.json();

    if (image) {
        await updateDiagramImage(diagram.id, image, token);
    }

    return diagram;
};

export const updateDiagram = async (
    diagramId: string,
    postDiagram: PostDiagram,
    image: File | undefined,
    token?: string,
): Promise<DiagramResource> => {
    const response = await fetch(`/api/diagrams/${diagramId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postDiagram),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to update diagram");
    }
    const diagram: DiagramResource = await response.json();

    if (image) {
        await updateDiagramImage(diagram.id, image, token);
    }

    return diagram;
};

export const deleteDiagram = async (
    diagramId: string,
    token?: string,
) => {
    const response = await fetch(`/api/diagrams/${diagramId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new PartChatError("Failed to delete diagram");
    }
};

const updateDiagramImage = async (
    diagramId: string,
    image: File,
    token?: string,
) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`/api/diagrams/${diagramId}/image`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    if (!response.ok) {
        throw new PartChatError("Failed to update diagram image");
    }
};
