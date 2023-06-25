export type MotorcycleResource = {
    id: string;
    make: string;
    yearFrom: number;
    yearTo: number;
    model: string;
    engineType: string;
    displacement: number;
    valvesPerCylinder: number;
    power: number;
    compression: number;
    topSpeed: number;
    weight: number;
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

export type PartReferenceResource = {
    diagramId: string;
    partId: string;
    hotspots: number[][];
    qty: number;
    refNo: number;

    _links?: {
        self: { href: string };
    };
};

export type CommentsResource = {
    total: number;
    items: {
        id: number;
    }[];
    _links?: {
        self: { href: string };
    };
};

export type CommentResource = {
    id: number;
    username: string;
    createdAt: string;
    nodes: object[];

    motorcycleId?: string;
    diagramId?: string;
    partId?: string;

    _links?: {
        self: { href: string };
    };
};

export type PostComment = {
    nodes: object[];

    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};
