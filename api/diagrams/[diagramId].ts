import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DIAGRAMS } from "../_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = request.query.diagramId;
    const diagram = DIAGRAMS.find((diagram) => diagram.id === diagramId);
    if (!diagram) {
        response.status(404).send("Diagram not found");
        return;
    }

    if (request.method === "GET") {
        console.info("Get diagram");
        response.status(200).send({
            ...diagram,
            _links: {
                self: { href: `/api/diagrams/${diagram.id}` },
                parts: { href: `/api/parts?diagramId=${diagram.id}` },
            },
        });
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
