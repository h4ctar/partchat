import {
    Id,
    Make,
    MotorcycleResource,
    PostMotorcycle,
    Year,
} from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest } from "http-errors";
import Jimp from "jimp";
import { z } from "zod";
import { prisma } from "./prisma";

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

    // TODO: protect
    server.post(
        "/api/motorcycles",
        {
            schema: {
                body: PostMotorcycle,
            },
        },
        async (request, reply) => {
            server.log.info("Create motorcycle");

            const postMotorcycle = request.body;
            const motorcycleModel = await prisma.motorcycle.create({
                data: {
                    id: `${postMotorcycle.make}-${postMotorcycle.model}`.toLowerCase(),
                    make: postMotorcycle.make,
                    yearFrom: postMotorcycle.yearFrom,
                    yearTo: postMotorcycle.yearTo,
                    model: postMotorcycle.model,
                    engineType: postMotorcycle.engineType,
                    displacement: postMotorcycle.displacement,
                    valvesPerCylinder: postMotorcycle.valvesPerCylinder,
                    power: postMotorcycle.power,
                    compression: postMotorcycle.compression,
                    topSpeed: postMotorcycle.topSpeed,
                    weight: postMotorcycle.weight,
                },
            });

            const motorcycleResource: MotorcycleResource = {
                ...motorcycleModel,
                _links: {
                    self: {
                        href: `/api/motorcycles/${motorcycleModel.id}`,
                    },
                    diagrams: {
                        href: `/api/diagrams?motorcycleId=${motorcycleModel.id}`,
                    },
                },
            };

            return reply.status(201).send(motorcycleResource);
        },
    );

    // TODO: protect
    server.put(
        "/api/motorcycles/:motorcycleId",
        {
            schema: {
                params: z.object({
                    motorcycleId: Id,
                }),
                body: PostMotorcycle,
            },
        },
        async (request, reply) => {
            server.log.info("Update motorcycle");

            const postMotorcycle = request.body;
            const motorcycleModel = await prisma.motorcycle.update({
                where: { id: request.params.motorcycleId },
                data: {
                    make: postMotorcycle.make,
                    yearFrom: postMotorcycle.yearFrom,
                    yearTo: postMotorcycle.yearTo,
                    model: postMotorcycle.model,
                    engineType: postMotorcycle.engineType,
                    displacement: postMotorcycle.displacement,
                    valvesPerCylinder: postMotorcycle.valvesPerCylinder,
                    power: postMotorcycle.power,
                    compression: postMotorcycle.compression,
                    topSpeed: postMotorcycle.topSpeed,
                    weight: postMotorcycle.weight,
                },
            });

            const motorcycleResource: MotorcycleResource = {
                ...motorcycleModel,
                _links: {
                    self: {
                        href: `/api/motorcycles/${motorcycleModel.id}`,
                    },
                    diagrams: {
                        href: `/api/diagrams?motorcycleId=${motorcycleModel.id}`,
                    },
                },
            };

            return reply.status(200).send(motorcycleResource);
        },
    );

    // TODO: protect
    server.patch(
        "/api/motorcycles/:motorcycleId/image",
        {
            schema: {
                params: z.object({
                    motorcycleId: Id,
                }),
            },
        },
        async (request, reply) => {
            // await checkToken(request, "create:motorcycles");

            server.log.info(
                `Patch motorcycle image - commentId: ${request.params.motorcycleId}`,
            );

            const data = await request.file();
            if (!data) {
                throw new BadRequest("Missing image");
            }

            const imageBuffer = await data.toBuffer();
            const image = await Jimp.read(imageBuffer);
            const path = `public/motorcycles/${request.params.motorcycleId}.png`;
            await image.writeAsync(path);

            return reply.status(200).send(path);
        },
    );

    // TODO: protect
    server.delete(
        "/api/motorcycles/:motorcycleId",
        {
            schema: {
                params: z.object({
                    motorcycleId: Id,
                }),
            },
        },
        async (request, reply) => {
            // const user = await checkToken(request, "delete:motorcycles");

            server.log.info(
                `Delete motorcycle - commentId: ${request.params.motorcycleId}`,
            );

            await prisma.motorcycle.delete({
                where: { id: request.params.motorcycleId },
            });

            return reply.status(200).send();
        },
    );
};
