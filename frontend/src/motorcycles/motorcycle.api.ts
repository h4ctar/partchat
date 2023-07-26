import { MotorcycleResource, PostMotorcycle } from "@partchat/types";
import { PartChatError } from "../ui/ErrorMessage";

export const fetchMotorcycles = async (): Promise<MotorcycleResource[]> => {
    const response = await fetch("/api/motorcycles");
    if (!response.ok) {
        throw new PartChatError("Failed to fetch motorcycles");
    }

    return response.json();
};

export const fetchMotorcycle =
    (motorcycleId: string) => async (): Promise<MotorcycleResource> => {
        const response = await fetch(`/api/motorcycles/${motorcycleId}`);
        if (!response.ok) {
            throw new PartChatError("Failed to fetch motorcycle");
        }

        return response.json();
    };

export const createMotorcycle = async (
    postMotorcycle: PostMotorcycle,
    image: File | undefined,
    getAccessTokenSilently: () => Promise<string>,
): Promise<MotorcycleResource> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`/api/motorcycles`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postMotorcycle),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to create motorcycle");
    }
    const motorcycle: MotorcycleResource = await response.json();

    if (image) {
        await updateMotorcycleImage(
            motorcycle.id,
            image,
            getAccessTokenSilently,
        );
    }

    return motorcycle;
};

export const updateMotorcycle = async (
    motorcycleId: string,
    postMotorcycle: PostMotorcycle,
    image: File | undefined,
    getAccessTokenSilently: () => Promise<string>,
): Promise<MotorcycleResource> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`/api/motorcycles/${motorcycleId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postMotorcycle),
    });
    if (!response.ok) {
        throw new PartChatError("Failed to update motorcycle");
    }
    const motorcycle: MotorcycleResource = await response.json();

    if (image) {
        await updateMotorcycleImage(
            motorcycle.id,
            image,
            getAccessTokenSilently,
        );
    }

    return motorcycle;
};

export const deleteMotorcycle = async (
    motorcycleId: string,
    getAccessTokenSilently: () => Promise<string>,
) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`/api/motorcycles/${motorcycleId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new PartChatError("Failed to delete motorcycle");
    }
};

const updateMotorcycleImage = async (
    motorcycleId: string,
    image: File,
    getAccessTokenSilently: () => Promise<string>,
) => {
    const token = await getAccessTokenSilently();

    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`/api/motorcycles/${motorcycleId}/image`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    if (!response.ok) {
        throw new PartChatError("Failed to update motorcycle image");
    }
};
