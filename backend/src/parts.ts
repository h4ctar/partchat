import { Id, PartResource } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { prisma } from "./prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const partRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get(
        "/api/parts",
        {
            schema: {
                querystring: z.object({
                    diagramId: Id.optional(),
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get all parts");

            const partModels = await prisma.part.findMany({
                where: {
                    partOnDiagrams: {
                        some: { diagramId: request.query.diagramId },
                    },
                },
                include: {
                    partOnDiagrams: !!request.query.diagramId,
                },
            });

            if (request.query.diagramId) {
                const partResources: PartResource[] = partModels
                    .map((partModel) => {
                        // Do this destructure so that the partOnDiagrams is not included in the response resources
                        const { partOnDiagrams: _, ...partResources } = {
                            ...partModel,
                            refNo: partModel.partOnDiagrams[0].refNo,
                            hotspots: JSON.parse(
                                partModel.partOnDiagrams[0].hotspots,
                            ) as number[][],
                            qty: partModel.partOnDiagrams[0].qty,
                            _links: {
                                self: { href: `/api/parts/${partModel.id}` },
                            },
                        };
                        return partResources;
                    })
                    .sort((a, b) => a.refNo - b.refNo);

                return reply.status(200).send(partResources);
            } else {
                const partResources: PartResource[] = partModels
                    .map((partModel) => {
                        const partResources = {
                            ...partModel,
                            _links: {
                                self: { href: `/api/parts/${partModel.id}` },
                            },
                        };
                        return partResources;
                    })
                    .sort((a, b) => a.partNumber.localeCompare(b.partNumber));

                return reply.status(200).send(partResources);
            }
        },
    );
};
