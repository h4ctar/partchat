import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../../prisma/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;
    const motorcycle = MOTORCYCLES.find(
        (motorcycle) => motorcycle.id === motorcycleId
    );
    if (!motorcycle) {
        response.status(404).send("Motorcycle not found");
        return;
    }

    if (request.method === "GET") {
        console.info("Get motorcycle");
        response.status(200).send({
            ...motorcycle,
            _links: {
                self: { href: `/api/motorcycles/${motorcycle.id}` },
                diagrams: {
                    href: `/api/diagrams?motorcycleId=${motorcycle.id}`,
                },
            },
        });
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
