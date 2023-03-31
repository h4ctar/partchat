export type MotorcycleResource = {
    id: string;
    make: string;
    yearFrom: number;
    yearTo: number;
    model: string;
    image: string;
    _links?: {
        self: { href: string };
        diagrams: {
            href: string;
        };
    };
};

export type DiagramResource = {
    id: string;
    name: string;
    image: string;
    width: number;
    height: number;
    _links?: {
        self: { href: string };
        parts: {
            href: string;
        };
    };
};

export type PartResource = {
    id: string;
    partNumber: string;
    description: string;
    qty?: number;
    refNo?: number;
    hotspots?: number[][];
    _links?: {
        self: { href: string };
    };
};

export type CommentResource = {
    id: number;
    username: string;
    createdAt: string;
    text: string;

    motorcycleId?: string;
    diagramId?: string;
    partId?: string;

    _links?: {
        self: { href: string };
    };
};

export type PostComment = {
    text: string;

    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};
