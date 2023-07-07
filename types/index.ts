import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.string();
export const Year = z.number().positive();
export const Make = z.string();

export const MotorcycleResource = z.object({
    id: Id,
    make: Make,
    yearFrom: z.number().int().positive(),
    yearTo: z.number().int().positive(),
    model: z.string(),
    engineType: z.string(),
    displacement: z.number().positive(),
    valvesPerCylinder: z.number().int().positive(),
    power: z.number().positive(),
    compression: z.number().positive(),
    topSpeed: z.number().positive(),
    weight: z.number().positive(),
    image: z.string(),

    _links: z
        .object({
            self: Link,
            diagrams: Link,
        })
        .optional(),
});
export type MotorcycleResource = z.infer<typeof MotorcycleResource>;

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

export const PostComment = z.object({
    nodes: z.object({}).array(),

    motorcycleId: Id.optional(),
    diagramId: Id.optional(),
    partId: Id.optional(),
});
export type PostComment = z.infer<typeof PostComment>;
