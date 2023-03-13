import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all motorcycles");
        const make = request.query.make;
        const year = parseInt(request.query.year as string);
        const motorcycles = _.uniq(
            MOTORCYCLES.filter(
                (motorcycle) => !make || motorcycle.make === make
            )
                .filter((motorcycle) => !year || motorcycle.yearFrom <= year)
                .filter((motorcycle) => !year || motorcycle.yearTo >= year)
        );
        response.status(200).send(motorcycles);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
