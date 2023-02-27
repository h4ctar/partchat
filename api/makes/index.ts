import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { MOTORCYCLES } from "../_data";
import { allowCors } from "../_utils";
import _ from "lodash";

export const MOTORCYCLES = [
  {
    make: "Yamaha",
    years: [1976],
    model: "XS750",
  },
];


const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    console.info("Get all makes");
    const makes = _.uniq(MOTORCYCLES.map((motorcycle) => motorcycle.make));
    response.status(200).send(makes);
  } else {
    throw new Error("Unsupported method");
  }
};

export default allowCors(handler);
