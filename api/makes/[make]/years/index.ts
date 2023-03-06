import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all years");
        const make = request.query.make;
        const years = _.uniq(
            MOTORCYCLES.filter(
                (motorcycle) => motorcycle.make === make
            ).flatMap((motorcycle) => motorcycle.years)
        );
        response.status(200).send(years);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
