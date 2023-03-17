import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
    DIAGRAMS,
    MOTORCYCLES,
    MOTORCYCLE_DIAGRAMS,
} from "../../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;
    const motorcycle = MOTORCYCLES.find(
        (motorcycle) => motorcycle.id === motorcycleId
    );
    if (!motorcycle) {
        response.status(404).send("Motorcycle not found");
    }

    if (request.method === "GET") {
        console.info("Get all diagrams");

        const motorcycleDiagrams = MOTORCYCLE_DIAGRAMS.filter(
            (motorcycleDiagram) =>
                motorcycleDiagram.motorcycleId === motorcycleId
        );

        const diagrams = DIAGRAMS.filter((diagram) =>
            motorcycleDiagrams.some(
                (motorcycleDiagram) =>
                    motorcycleDiagram.diagramId === diagram.id
            )
        );

        response.status(200).send(diagrams);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
