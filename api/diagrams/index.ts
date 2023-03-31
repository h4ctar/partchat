import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DiagramResource } from "../../types/motorcycles";
import { prisma } from "../_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all diagrams");

        const motorcycleId =
            (request.query.motorcycleId as string) || undefined;

        const diagramModels = await prisma.diagram.findMany({
            where: {
                motorcycles: {
                    some: {
                        id: motorcycleId,
                    },
                },
            },
        });

        const diagramResources: DiagramResource[] = diagramModels.map(
            (diagramModel) => ({
                ...diagramModel,
                _links: {
                    self: { href: `/api/diagrams/${diagramModel.id}` },
                    parts: { href: `/api/parts?diagramId=${diagramModel.id}` },
                },
            }),
        );

        response.status(200).send(diagramResources);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
