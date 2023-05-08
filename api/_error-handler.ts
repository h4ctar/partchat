import { VercelApiHandler, VercelRequest, VercelResponse } from "@vercel/node";
import { ForbiddenError, UnauthorizedError } from "./_auth.js";

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
            } else {
                throw err;
            }
        }
    };
