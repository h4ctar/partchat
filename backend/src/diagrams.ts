import { DiagramResource, Id } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { prisma } from "./prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

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
                return reply.status(404).send("Diagram not found");
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
};
