import { DiagramResource, Id, PostDiagram } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest, NotFound } from "http-errors";
import slugify from "slugify";
import { z } from "zod/v4";
import { checkToken } from "./auth";
import { prisma } from "./prisma";
import { Jimp } from "jimp";

export const diagramRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get(
        "/api/diagrams",
        {
            schema: {
                querystring: z.object({
                    motorcycleId: Id,
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get all diagrams");

            const diagramModels = await prisma.diagram.findMany({
                where: {
                    motorcycles: {
                        some: {
                            id: request.query.motorcycleId,
                        },
                    },
                },
            });

            const diagramResources: DiagramResource[] = diagramModels.map(
                (diagramModel) => ({
                    ...diagramModel,
                    _links: {
                        self: { href: `/api/diagrams/${diagramModel.id}` },
                        parts: {
                            href: `/api/parts?diagramId=${diagramModel.id}`,
                        },
                    },
                }),
            );

            return reply.status(200).send(diagramResources);
        },
    );

    server.get(
        "/api/diagrams/:diagramId",
        {
            schema: {
                params: z.object({
                    diagramId: Id,
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get diagram");

            const diagramModel = await prisma.diagram.findUnique({
                where: {
                    id: request.params.diagramId,
                },
            });

            if (!diagramModel) {
                throw new NotFound("Diagram not found");
            }

            const diagramResource: DiagramResource = {
                ...diagramModel,
                _links: {
                    self: { href: `/api/diagrams/${request.params.diagramId}` },
                    parts: {
                        href: `/api/parts?diagramId=${request.params.diagramId}`,
                    },
                },
            };

            return reply.status(200).send(diagramResource);
        },
    );

    server.post(
        "/api/diagrams",
        {
            schema: {
                body: PostDiagram,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:diagrams");

            server.log.info("Create diagram");

            const postDiagram = request.body;

            const diagramModel = await prisma.diagram.create({
                data: {
                    id: slugify(
                        `${postDiagram.motorcycleId} ${postDiagram.name}`,
                        { lower: true },
                    ),
                    name: postDiagram.name,
                    width: 0,
                    height: 0,
                    motorcycles: {
                        connect: { id: postDiagram.motorcycleId },
                    },
                },
            });

            const diagramResource: DiagramResource = {
                ...diagramModel,
                _links: {
                    self: {
                        href: `/api/diagrams/${diagramModel.id}`,
                    },
                    parts: {
                        href: `/api/parts?diagramId=${diagramModel.id}`,
                    },
                },
            };

            return reply.status(201).send(diagramResource);
        },
    );

    server.put(
        "/api/diagrams/:diagramId",
        {
            schema: {
                params: z.object({
                    diagramId: Id,
                }),
                body: PostDiagram,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:diagrams");

            server.log.info("Update diagram");

            const postDiagram = request.body;
            const diagramModel = await prisma.diagram.update({
                where: { id: request.params.diagramId },
                data: {
                    name: postDiagram.name,
                    motorcycles: {
                        connect: { id: postDiagram.motorcycleId },
                    },
                },
            });

            const diagramResource: DiagramResource = {
                ...diagramModel,
                _links: {
                    self: {
                        href: `/api/diagrams/${diagramModel.id}`,
                    },
                    parts: {
                        href: `/api/parts?diagramId=${diagramModel.id}`,
                    },
                },
            };

            return reply.status(200).send(diagramResource);
        },
    );

    server.patch(
        "/api/diagrams/:diagramId/image",
        {
            schema: {
                params: z.object({
                    diagramId: Id,
                }),
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:diagrams");

            server.log.info(
                `Patch diagram image - diagramId: ${request.params.diagramId}`,
            );

            const data = await request.file();
            if (!data) {
                throw new BadRequest("Missing image");
            }

            const imageBuffer = await data.toBuffer();
            const image = await Jimp.read(imageBuffer);
            const path: `${string}.${string}` = `public/diagrams/${request.params.diagramId}.png`;
            await image.write(path);

            await prisma.diagram.update({
                where: { id: request.params.diagramId },
                data: {
                    width: image.width,
                    height: image.height,
                },
            });

            return reply.status(200).send(path);
        },
    );

    server.delete(
        "/api/diagrams/:diagramId",
        {
            schema: {
                params: z.object({
                    diagramId: Id,
                }),
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:diagrams");

            server.log.info(
                `Delete diagram - diagramId: ${request.params.diagramId}`,
            );

            await prisma.diagram.delete({
                where: { id: request.params.diagramId },
            });

            return reply.status(200).send();
        },
    );
};
