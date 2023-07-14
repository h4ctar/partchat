import { FastifyRequest } from "fastify";
import { Forbidden } from "http-errors";

export type User = {
    scope: string;
    username: string;
};

export const checkToken = async (request: FastifyRequest, scope: string) => {
    const user: User = await request.jwtVerify();
    if (!user.scope.includes(scope)) {
        throw new Forbidden("Incorrect token scope");
    }
    return user;
};
