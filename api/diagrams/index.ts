import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DiagramResource } from "../../types/motorcycles";
import { DIAGRAMS, MOTORCYCLE_DIAGRAMS } from "../_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;

    if (request.method === "GET") {
        console.info("Get all diagrams");

        const motorcycleDiagrams = MOTORCYCLE_DIAGRAMS.filter(
            (motorcycleDiagram) =>
                !motorcycleId || motorcycleDiagram.motorcycleId === motorcycleId
        );

        const diagrams: DiagramResource[] = DIAGRAMS.filter((diagram) =>
            motorcycleDiagrams.some(
                (motorcycleDiagram) =>
                    motorcycleDiagram.diagramId === diagram.id
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
