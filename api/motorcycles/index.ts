import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MotorcycleResource } from "../../types/motorcycles";
import { MOTORCYCLES } from "../_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all motorcycles");
        const make = request.query.make;
        const year = parseInt(request.query.year as string);
        const motorcycles: MotorcycleResource[] = _.uniq(
            MOTORCYCLES.filter(
                (motorcycle) => !make || motorcycle.make === make
            )
                .filter((motorcycle) => !year || motorcycle.yearFrom <= year)
                .filter((motorcycle) => !year || motorcycle.yearTo >= year)
                .map((motorcycle) => ({
                    ...motorcycle,
                    _links: {
                        self: { href: `/api/motorcycles${motorcycle.id}` },
                        diagrams: {
                            href: `/api/diagrams?motorcycleId=${motorcycle.id}`,
                        },
                    },
                }))
        );
        response.status(200).send(motorcycles);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
