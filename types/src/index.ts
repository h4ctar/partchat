import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.string();
export const Year = z.number().positive();
export const Make = z.string();

export const MotorcycleResource = z.object({
    id: Id,
    make: Make,
    yearFrom: Year,
    yearTo: Year,
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

export const DiagramResource = z.object({
    id: Id,
    name: z.string(),
    image: z.string(),
    width: z.number(),
    height: z.number(),

    _links: z
        .object({
            self: Link,
            parts: Link,
        })
        .optional(),
});
export type DiagramResource = z.infer<typeof DiagramResource>;

export const PartResource = z.object({
    id: Id,
    partNumber: z.string(),
    description: z.string(),
    qty: z.number().optional(),
    refNo: z.number().optional(),
    hotspots: z.number().array().length(4).array().optional(),

    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type PartResource = z.infer<typeof PartResource>;

export const PartReferenceResource = z.object({
    diagramId: Id,
    partId: Id,
    hotspots: z.number().array().length(4).array().optional(),
    qty: z.number(),
    refNo: z.number(),

    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type PartReferenceResource = z.infer<typeof PartReferenceResource>;

export const CommentResource = z.object({
    id: Id,
    username: z.string(),
    createdAt: z.string(),
    nodes: z.any().array().min(1),

    motorcycleId: z.string().optional(),
    diagramId: z.string().optional(),
    partId: z.string().optional(),

    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type CommentResource = z.infer<typeof CommentResource>;

export const PostComment = z.object({
    nodes: z.any().array().min(1),

    motorcycleId: Id.optional(),
    diagramId: Id.optional(),
    partId: Id.optional(),
});
export type PostComment = z.infer<typeof PostComment>;
