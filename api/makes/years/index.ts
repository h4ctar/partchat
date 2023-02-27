import type { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "../../_utils";

const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    console.info("Get all years");
    console.log(request);

    response.status(200).send([]);
  } else {
    throw new Error("Unsupported method");
  }
};

export default allowCors(handler);
