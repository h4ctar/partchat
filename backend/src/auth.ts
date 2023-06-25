import { FastifyInstance } from "fastify";
import { Authenticate } from "fastify-jwt-jwks";
import { Forbidden } from "http-errors";

export type User = {
    scope: string;
    username: string;
};

export const authenticate =
    (server: FastifyInstance, ...scopes: string[]): Authenticate =>
    async (request, reply) => {
        await server.authenticate(request, reply);
        const user = request.user as User;
        for (const scope of scopes) {
            if (!user.scope.includes(scope)) {
                throw new Forbidden("Incorrect token scope");
            }
        }
    };
