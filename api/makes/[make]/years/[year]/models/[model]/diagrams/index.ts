import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
import {
    DIAGRAMS,
    MOTORCYCLES,
    MOTORCYCLE_DIAGRAMS,
} from "../../../../../../../utils/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all diagrams");
        const make = request.query.make;
        const year = Number(request.query.year);
        const model = request.query.model;

        const motorcycles = MOTORCYCLES.filter(
            (motorcycle) => motorcycle.make === make
        )
            .filter((motorcycle) => motorcycle.years.includes(year))
            .filter((motorcycle) => motorcycle.model === model);

        const diagrams = _.uniq(
            MOTORCYCLE_DIAGRAMS.filter((motorcycleDiagram) =>
                motorcycles.some(
                    (motorcycle) =>
                        motorcycle.id === motorcycleDiagram.motorcycleId
                )
            ).map((motorcycleDiagram) =>
                DIAGRAMS.find(
                    (diagram) => diagram.id === motorcycleDiagram.diagramId
                )
            )
        );
        response.status(200).send(diagrams);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
