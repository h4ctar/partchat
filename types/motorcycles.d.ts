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
    size: number[];
    _links?: {
        self: { href: string };
        parts: {
            href: string;
        };
    };
};

export type PartResource = {
    id: string;
    number: string;
    description: string;
    qty?: number;
    refNo?: number;
    // TODO: this needs to support multiple bounding boxes
    bbox?: number[];
    _links?: {
        self: { href: string };
    };
};

export type CommentResource = {
    id: string;
    username: string;
    postedDate: string;
    text: string;
    _links?: {
        self: { href: string };
    };
} & ({ diagramId: string } | { commentId: string });
