import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DiagramResource } from "../../types/motorcycles";
import { DIAGRAMS, MOTORCYCLE_TO_DIAGRAMS } from "../../prisma/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;

    if (request.method === "GET") {
        console.info("Get all diagrams");

        const motorcycleToDiagrams = MOTORCYCLE_TO_DIAGRAMS.filter(
            (motorcycleToDiagram) =>
                !motorcycleId ||
                motorcycleToDiagram.motorcycleId === motorcycleId
        );

        const diagrams: DiagramResource[] = DIAGRAMS.filter((diagram) =>
            motorcycleToDiagrams.some(
                (motorcycleToDiagram) =>
                    motorcycleToDiagram.diagramId === diagram.id
            )
        ).map((diagram) => ({
            ...diagram,
            _links: {
                self: { href: `/api/diagrams/${diagram.id}` },
                parts: { href: `/api/parts?diagramId=${diagram.id}` },
            },
        }));

        response.status(200).send(diagrams);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
