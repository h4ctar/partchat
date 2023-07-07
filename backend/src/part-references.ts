import { FastifyPluginCallback } from "fastify";
import { authenticate } from "./auth";
import { PartReferenceResource } from "../../types";
import { prisma } from "./prisma";

type PartReferenceParams = {
    diagramId: string;
    partId: string;
};

export const partReferenceRoutes: FastifyPluginCallback = async (server) => {
    server.put<{ Params: PartReferenceParams; Body: PartReferenceResource }>(
        "/api/diagrams/:diagramId/part-references/:partId",
        {
            preValidation: authenticate(server, "put:part-references"),
        },
        async (request, reply) => {
            server.log.info(
                `Update part reference - diagramId: ${request.params.diagramId}, partId: ${request.params.partId}`,
            );

            const partReference = request.body;
            server.log.error(partReference);
            const partReferenceModel = await prisma.partToDiagram.update({
                where: {
                    partId_diagramId: {
                        partId: request.params.partId,
                        diagramId: request.params.diagramId,
                    },
                },
                data: {
                    hotspots: JSON.stringify(request.body.hotspots),
                },
            });

            const partReferenceResource: PartReferenceResource = {
                ...partReferenceModel,
                hotspots: partReferenceModel.hotspots as unknown as number[][],
                _links: {
                    self: {
                        href: `/api/diagrams/${request.params.diagramId}/part-references/${request.params.partId}`,
                    },
                },
            };

            reply.status(200).send(partReferenceResource);
        },
    );
};
