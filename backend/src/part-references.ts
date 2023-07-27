import { Id, PartReferenceResource } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "./prisma";
import { User, checkToken } from "./auth";

export const partReferenceRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.put(
        "/api/diagrams/:diagramId/part-references/:partId",
        {
            schema: {
                params: z.object({
                    diagramId: Id,
                    partId: Id,
                }),
                body: PartReferenceResource,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:diagrams");

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
