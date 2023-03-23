import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { DIAGRAMS, MOTORCYCLES } from "../../../../_data";

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
        console.info("Get diagram");
        response.status(200).send(diagram);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
