import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get motorcycle");
        const motorcycleId = request.query.motorcycleId;
        const motorcycle = MOTORCYCLES.find(
            (motorcycle) => motorcycle.id === motorcycleId
        );
        response.status(200).send(motorcycle);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
