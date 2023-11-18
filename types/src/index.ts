import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.string().min(1);
export const Year = z.coerce.number().positive();
export const Make = z.string().min(1);

export const Motorcycle = z.object({
    make: Make,
    yearFrom: Year,
    yearTo: Year,
    model: z.string().nonempty(),
    engineType: z.string().nonempty(),
    displacement: z.coerce
        .number()
        .positive()
        .describe("Engine displacement in ccm"),
    valvesPerCylinder: z.coerce.number().int().positive(),
    power: z.coerce.number().positive(),
    compression: z.coerce.number().positive(),
    topSpeed: z.coerce.number().positive(),
    weight: z.coerce.number().positive(),
});

export const MotorcycleResource = Motorcycle.extend({
    id: Id,
    _links: z
        .object({
            self: Link,
            diagrams: Link,
        })
        .optional(),
});
export type MotorcycleResource = z.infer<typeof MotorcycleResource>;

export const PostMotorcycle = Motorcycle;
export type PostMotorcycle = z.infer<typeof PostMotorcycle>;

export const Diagram = z.object({
    name: z.string().nonempty(),
    width: z.number(),
    height: z.number(),
});

export const DiagramResource = Diagram.extend({
    id: Id,
    _links: z
        .object({
            self: Link,
            parts: Link,
        })
        .optional(),
});
export type DiagramResource = z.infer<typeof DiagramResource>;

export const PostDiagram = Diagram.omit({ width: true, height: true }).extend({
    motorcycleId: Id,
});
export type PostDiagram = z.infer<typeof PostDiagram>;

export const PartResource = z.object({
    id: Id,
    partNumber: z.string().nonempty(),
    description: z.string().nonempty(),
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
    username: z.string().nonempty(),
    createdAt: z.string().nonempty(),
    nodes: z.any().array().min(1),

    motorcycleId: z.string().nonempty().optional(),
    diagramId: z.string().nonempty().optional(),
    partId: z.string().nonempty().optional(),

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
