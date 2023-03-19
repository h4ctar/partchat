import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
    DIAGRAMS,
    DIAGRAM_PARTS,
    MOTORCYCLES,
    PARTS,
} from "../../../../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;
    const motorcycle = MOTORCYCLES.find(
        (motorcycle) => motorcycle.id === motorcycleId
    );
    if (!motorcycle) {
        response.status(404).send("Motorcycle not found");
    }

    const diagramId = request.query.diagramId;
    const diagram = DIAGRAMS.find((diagram) => diagram.id === diagramId);
    if (!diagram) {
        response.status(404).send("Diagram not found");
    }

    // TODO: check if diagram belongs to motorcycle

    if (request.method === "GET") {
        console.info("Get all parts");

        const diagramParts = DIAGRAM_PARTS.filter(
            (diagramPart) => diagramPart.diagramId === diagramId
        );

        const parts = diagramParts.map((diagramPart) => {
            const part = PARTS.find((part) => part.id === diagramPart.partId);
            return { ...part, refNo: diagramPart.refNo };
        });

        response.status(200).send(parts);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
