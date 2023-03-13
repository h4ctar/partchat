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
            ).flatMap((motorcycle) =>
                Array(motorcycle.yearTo - motorcycle.yearFrom + 1)
                    .fill(0)
                    .map((_, index) => index + motorcycle.yearFrom)
            )
        );
        response.status(200).send(years);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
