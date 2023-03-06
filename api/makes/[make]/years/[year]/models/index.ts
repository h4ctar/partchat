import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../../../../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all models");
        const make = request.query.make;
        const year = Number(request.query.year);
        const models = _.uniq(
            MOTORCYCLES.filter((motorcycle) => motorcycle.make === make)
                .filter((motorcycle) => motorcycle.years.includes(year))
                .map((motorcycle) => motorcycle.model)
        );
        response.status(200).send(models);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
