import { Id, Make, MotorcycleResource, Year } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { prisma } from "./prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const motorcycleRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get(
        "/api/motorcycles",
        {
            schema: {
                querystring: z.object({
                    year: Year.optional(),
                    make: Make.optional(),
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get all motorcycles");

            const motorcycleModels = await prisma.motorcycle.findMany({
                where: {
                    make: request.query.make,
                    yearFrom: { lte: request.query.year },
                    yearTo: { gte: request.query.year },
                },
                orderBy: {
                    yearFrom: "asc",
                },
            });

            const motorcycleResources: MotorcycleResource[] =
                motorcycleModels.map((motorcycleModel) => ({
                    ...motorcycleModel,
                    _links: {
                        self: {
                            href: `/api/motorcycles/${motorcycleModel.id}`,
                        },
                        diagrams: {
                            href: `/api/diagrams?motorcycleId=${motorcycleModel.id}`,
                        },
                    },
                }));

            return reply.status(200).send(motorcycleResources);
        },
    );

    server.get(
        "/api/motorcycles/:motorcycleId",
        {
            schema: {
                params: z.object({
                    motorcycleId: Id,
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get motorcycle");

            const motorcycleModel = await prisma.motorcycle.findUnique({
                where: {
                    id: request.params.motorcycleId,
                },
            });

            if (!motorcycleModel) {
                return reply.status(404).send("Motorcycle not found");
            }

            const motorcycleResource: MotorcycleResource = {
                ...motorcycleModel,
                _links: {
                    self: {
                        href: `/api/motorcycles/${request.params.motorcycleId}`,
                    },
                    diagrams: {
                        href: `/api/diagrams?motorcycleId=${request.params.motorcycleId}`,
                    },
                },
            };

            return reply.status(200).send(motorcycleResource);
        },
    );
};
