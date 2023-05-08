import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MotorcycleResource } from "../../types/motorcycles.js";
import { prisma } from "../_prisma.js";
import { UnsupportedMethodError } from "../_error-handler.js";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = (request.query.motorcycleId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get motorcycle");

        const motorcycleModel = await prisma.motorcycle.findUnique({
            where: {
                id: motorcycleId,
            },
        });

        if (!motorcycleModel) {
            response.status(404).send("Motorcycle not found");
            return;
        }

        const motorcycleResource: MotorcycleResource = {
            ...motorcycleModel,
            _links: {
                self: { href: `/api/motorcycles/${motorcycleId}` },
                diagrams: {
                    href: `/api/diagrams?motorcycleId=${motorcycleId}`,
                },
            },
        };

        response.status(200).send(motorcycleResource);
    } else {
        throw new UnsupportedMethodError();
    }
};

export default handler;
