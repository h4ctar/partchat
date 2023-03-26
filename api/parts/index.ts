import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PartResource } from "../../types/motorcycles";
import { DIAGRAM_PARTS, PARTS } from "../_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = request.query.diagramId;

    if (request.method === "GET") {
        console.info("Get all parts");

        if (diagramId) {
            const diagramParts = DIAGRAM_PARTS.filter(
                (diagramPart) => diagramPart.diagramId === diagramId
            );

            const parts: PartResource[] = diagramParts
                .map((diagramPart) => {
                    const part = PARTS.find(
                        (part) => part.id === diagramPart.partId
                    );
                    if (!part) {
                        throw new Error("Part not found");
                    }
                    return {
                        ...part,
                        refNo: diagramPart.refNo,
                        bbox: diagramPart.bbox,
                    };
                })
                .map((part) => ({
                    ...part,
                    _links: {
                        self: { href: `/api/parts${part.id}` },
                    },
                }));

            response.status(200).send(parts);
        } else {
            const parts: PartResource[] = PARTS.map((part) => ({
                ...part,
                _links: {
                    self: { href: `/api/parts${part.id}` },
                },
            }));
            response.status(200).send(parts);
        }
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
