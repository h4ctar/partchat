import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../_prisma.js";
import { DiagramResource } from "../../../types/motorcycles.js";
import { UnsupportedMethodError } from "../../_error-handler.js";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = (request.query.diagramId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get diagram");

        const diagramModel = await prisma.diagram.findUnique({
            where: {
                id: diagramId,
            },
        });

        if (!diagramModel) {
            response.status(404).send("Diagram not found");
            return;
        }

        const diagramResource: DiagramResource = {
            ...diagramModel,
            _links: {
                self: { href: `/api/diagrams/${diagramId}` },
                parts: {
                    href: `/api/parts?diagramId=${diagramId}`,
                },
            },
        };

        response.status(200).send(diagramResource);
    } else {
        throw new UnsupportedMethodError();
    }
};

export default handler;