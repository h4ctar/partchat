import { Motorcycle } from "@prisma/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import { prisma } from "./_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get config");

        const motorcycles = await prisma.motorcycle.findMany();

        // This gross bit of code builds the config for the make -> year -> model selectors
        // I'm sure it can be done a lot better
        // {
        //     Honda: {
        //         1975: {
        //             CB400F: "honda-cb400f-1975-1977",
        //         },
        //     },
        // };
        const config = getMakes(motorcycles).reduce(
            (makes, make) => ({
                ...makes,
                [make]: getYears(motorcycles, make).reduce(
                    (years, year) => ({
                        ...years,
                        [year]: getMotorcycles(motorcycles, make, year).reduce(
                            (models, motorcycle) => ({
                                ...models,
                                [motorcycle.model]: motorcycle.id,
                            }),
                            {},
                        ),
                    }),
                    {},
                ),
            }),
            {},
        );

        response.status(200).send(config);
    } else {
        throw new Error("Unsupported method");
    }
};

const getMakes = (motorcycles: Motorcycle[]) =>
    _.uniq(motorcycles.map((motorcycle) => motorcycle.make));

const getYears = (motorcycles: Motorcycle[], make: string) =>
    _.uniq(
        motorcycles
            .filter((motorcycle) => motorcycle.make === make)
            .flatMap((motorcycle) =>
                Array(motorcycle.yearTo - motorcycle.yearFrom + 1)
                    .fill(0)
                    .map((_, index) => index + motorcycle.yearFrom),
            ),
    );

const getMotorcycles = (
    motorcycles: Motorcycle[],
    make: string,
    year: number,
) =>
    _.uniq(
        motorcycles
            .filter((motorcycle) => motorcycle.make === make)
            .filter((motorcycle) => motorcycle.yearFrom <= year)
            .filter((motorcycle) => motorcycle.yearTo >= year),
    );

export default handler;
