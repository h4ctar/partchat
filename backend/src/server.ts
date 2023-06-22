import "dotenv/config";
import fastify from "fastify";
import jwtVerify from "fastify-auth0-verify";
import { commentRoutes } from "./comments";
import { motorcycleRoutes } from "./motorcycles";
import { diagramRoutes } from "./diagrams";
import { partRoutes } from "./parts";

export const server = fastify({ logger: true });

const start = async () => {
    try {
        await server.register(jwtVerify, { domain: "h4ctar" });
        await server.register(commentRoutes);
        await server.register(diagramRoutes);
        await server.register(motorcycleRoutes);
        await server.register(partRoutes);

        await server.listen({ port: 3000 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
