import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MotorcycleResource } from "../../types/motorcycles";
import { prisma } from "../_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all motorcycles");

        const make = request.query.make as string;
        const year = parseInt(request.query.year as string);

        const motorcycleModels = await prisma.motorcycle.findMany({
            where: {
                make,
                yearFrom: { lte: year },
                yearTo: { gte: year },
            },
        });

        const motorcycleResources: MotorcycleResource[] = motorcycleModels.map(
            (motorcycleModel) => ({
                ...motorcycleModel,
                _links: {
                    self: { href: `/api/motorcycles/${motorcycleModel.id}` },
                    diagrams: {
                        href: `/api/diagrams?motorcycleId=${motorcycleModel.id}`,
                    },
                },
            })
        );
        response.status(200).send(motorcycleResources);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
