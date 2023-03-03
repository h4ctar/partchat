import type { VercelRequest, VercelResponse } from "@vercel/node";
import _ from "lodash";
// import { MOTORCYCLES } from "../_data";
const MOTORCYCLES = require("../_data");

const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    console.info("Get all makes");
    const makes = _.uniq(MOTORCYCLES.map((motorcycle) => motorcycle.make));
    response.status(200).send(makes);
  } else {
    throw new Error("Unsupported method");
  }
};

export default handler;
