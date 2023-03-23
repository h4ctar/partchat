import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { MOTORCYCLES } from "./_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get config");
        const config = getMakes().reduce(
            (makes, make) => ({
                ...makes,
                [make]: getYears(make).reduce(
                    (years, year) => ({
                        ...years,
                        [year]: getMotorcycles(make, year).reduce(
                            (models, motorcycle) => ({
                                ...models,
                                [motorcycle.model]: motorcycle.id,
                            }),
                            {}
                        ),
                    }),
                    {}
                ),
            }),
            {}
        );
        response.status(200).send(config);
    } else {
        throw new Error("Unsupported method");
    }
};

const getMakes = () => _.uniq(MOTORCYCLES.map((motorcycle) => motorcycle.make));
const getYears = (make: string) =>
    _.uniq(
        MOTORCYCLES.filter((motorcycle) => motorcycle.make === make).flatMap(
            (motorcycle) =>
                Array(motorcycle.yearTo - motorcycle.yearFrom + 1)
                    .fill(0)
                    .map((_, index) => index + motorcycle.yearFrom)
        )
    );
const getMotorcycles = (make: string, year: number) =>
    _.uniq(
        MOTORCYCLES.filter((motorcycle) => motorcycle.make === make)
            .filter((motorcycle) => motorcycle.yearFrom <= year)
            .filter((motorcycle) => motorcycle.yearTo >= year)
    );

export default handler;

const a = {
    Honda: {
        1976: { CB400f: "cb400f" },
    },
    Yamaha: {},
};
