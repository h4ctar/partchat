import { DiagramResource } from "../../types";
import { prisma } from "./prisma";
import { FastifyPluginCallback } from "fastify";

type DiagramsQuery = {
    motorcycleId?: string;
};

type DiagramParams = {
    diagramId: string;
};

export const diagramRoutes: FastifyPluginCallback = async (server) => {
    server.get<{ Querystring: DiagramsQuery }>(
        "/api/diagrams",
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

    server.get<{ Params: DiagramParams }>(
        "/api/diagrams/:diagramId",
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
