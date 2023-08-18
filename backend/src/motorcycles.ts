import {
    Id,
    Make,
    MotorcycleResource,
    PostMotorcycle,
    Year,
} from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { BadRequest, NotFound } from "http-errors";
import Jimp from "jimp";
import slugify from "slugify";
import { z } from "zod";
import { checkToken } from "./auth";
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
                throw new NotFound("Motorcycle not found");
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

    server.post(
        "/api/motorcycles",
        {
            schema: {
                body: PostMotorcycle,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:motorcycles");

            server.log.info("Create motorcycle");

            const postMotorcycle = request.body;
            const motorcycleModel = await prisma.motorcycle.create({
                data: {
                    id: slugify(
                        `${postMotorcycle.make} ${postMotorcycle.model}`,
                        { lower: true },
                    ),
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
            await checkToken(request, "edit:motorcycles");

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
            await checkToken(request, "edit:motorcycles");

            server.log.info(
                `Patch motorcycle image - motorcycleId: ${request.params.motorcycleId}`,
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
            await checkToken(request, "edit:motorcycles");

            server.log.info(
                `Delete motorcycle - motorcycleId: ${request.params.motorcycleId}`,
            );

            await prisma.motorcycle.delete({
                where: { id: request.params.motorcycleId },
            });

            return reply.status(200).send();
        },
    );
};
