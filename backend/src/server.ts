import "dotenv/config";
import fastify from "fastify";
import jwtVerify from "fastify-jwt-jwks";
import { commentRoutes } from "./comments";
import { diagramRoutes } from "./diagrams";
import { motorcycleRoutes } from "./motorcycles";
import { partRoutes } from "./parts";
import { User } from "./auth";
import { partReferenceRoutes } from "./part-references";

export const server = fastify({ logger: true });

const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "3000");
        server.log.info(`Starting server on port ${port}`);

        await server.register(jwtVerify, {
            jwksUrl: process.env.JWKS_URL,
            formatUser: (payload) => payload as User,
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
