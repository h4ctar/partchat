import { Id, Make, MotorcycleResource, Year } from "@partchat/types";
import { FastifyPluginCallback } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { prisma } from "./prisma";

type MotorcyclesQuery = {
    make?: string;
    year?: number;
};

type MotorcycleParams = {
    motorcycleId: string;
};

export const motorcycleRoutes: FastifyPluginCallback = async (server) => {
    server.get<{ Querystring: MotorcyclesQuery }>(
        "/api/motorcycles",
        {
            schema: {
                params: {
                    year: zodToJsonSchema(Year.optional()),
                    make: zodToJsonSchema(Make.optional()),
                },
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

    server.get<{ Params: MotorcycleParams }>(
        "/api/motorcycles/:motorcycleId",
        {
            schema: {
                params: {
                    motorcycleId: zodToJsonSchema(Id),
                },
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
