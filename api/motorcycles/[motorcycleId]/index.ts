import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = request.query.motorcycleId;
    const motorcycle = MOTORCYCLES.find(
        (motorcycle) => motorcycle.id === motorcycleId
    );
    if (!motorcycle) {
        response.status(404).send("Motorcycle not found");
    }

    if (request.method === "GET") {
        console.info("Get motorcycle");
        response.status(200).send(motorcycle);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
