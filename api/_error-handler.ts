import { VercelApiHandler, VercelRequest, VercelResponse } from "@vercel/node";

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class UnsupportedMethodError extends Error {
    constructor() {
        super("Method not allowed");
        this.name = "UnsupportedMethodError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export const errorHandler =
    (handler: VercelApiHandler) =>
    async (request: VercelRequest, response: VercelResponse) => {
        try {
            await handler(request, response);
        } catch (err) {
            if (err instanceof ForbiddenError) {
                response.status(403).send(err.message);
                return;
            } else if (err instanceof UnauthorizedError) {
                response.status(401).send(err.message);
                return;
            } else if (err instanceof UnsupportedMethodError) {
                response.status(405).send(err.message);
                return;
            } else if (err instanceof NotFoundError) {
                response.status(404).send(err.message);
            } else {
                throw err;
            }
        }
    };
