import multipartPlugin from "@fastify/multipart";
import staticPlugin from "@fastify/static";
import "dotenv/config";
import fastify from "fastify";
import jwtVerify from "fastify-jwt-jwks";
import {
    ZodTypeProvider,
    serializerCompiler,
    validatorCompiler,
} from "fastify-type-provider-zod";
import path from "path";
import { User } from "./auth";
import { commentRoutes } from "./comments";
import { diagramRoutes } from "./diagrams";
import { motorcycleRoutes } from "./motorcycles";
import { partReferenceRoutes } from "./part-references";
import { partRoutes } from "./parts";
import { z } from "zod/v4";
import { Id } from "@partchat/types";

export const server = fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "3000");
        server.log.info(`Starting server on port ${port}`);

        await server.register(jwtVerify, {
            jwksUrl: process.env.JWKS_URL,
            issuer: process.env.ISSUER,
            formatUser: (payload) => payload as User,
        });
        await server.register(multipartPlugin);
        await server.register(staticPlugin, {
            root: path.join(process.cwd(), "public"),
            prefix: "/public/",
        });

        await server.register(commentRoutes);
        await server.register(diagramRoutes);
        await server.register(motorcycleRoutes);
        await server.register(partReferenceRoutes);
        await server.register(partRoutes);

        await server.listen({ port: port });

        server.log.info(`Server listening on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
