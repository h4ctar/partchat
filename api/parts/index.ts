import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PartResource } from "../../types/motorcycles";
import { DIAGRAM_TO_PARTS, PARTS } from "../../prisma/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = request.query.diagramId;

    if (request.method === "GET") {
        console.info("Get all parts");

        if (diagramId) {
            const diagramParts = DIAGRAM_TO_PARTS.filter(
                (diagramToPart) => diagramToPart.diagramId === diagramId
            );

            const parts: PartResource[] = diagramParts
                .map((diagramToPart) => {
                    const part = PARTS.find(
                        (part) => part.id === diagramToPart.partId
                    );
                    if (!part) {
                        throw new Error("Part not found");
                    }
                    return {
                        ...part,
                        refNo: diagramToPart.refNo,
                        hotspot: diagramToPart.hotspot as number[],
                        qty: diagramToPart.qty,
                    };
                })
                .map((part) => ({
                    ...part,
                    _links: {
                        self: { href: `/api/parts/${part.id}` },
                    },
                }))
                .sort((a, b) => a.refNo - b.refNo);

            response.status(200).send(parts);
        } else {
            const parts: PartResource[] = PARTS.map((part) => ({
                ...part,
                _links: {
                    self: { href: `/api/parts/${part.id}` },
                },
            }));
            response.status(200).send(parts);
        }
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
