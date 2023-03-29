import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PartResource } from "../../types/motorcycles";
import { prisma } from "../_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = (request.query.diagramId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get all parts");

        const partModels = await prisma.part.findMany({
            where: {
                partOnDiagram: {
                    some: { diagramId },
                },
            },
            include: {
                partOnDiagram: true,
            },
        });

        const partResources: PartResource[] = partModels.map((partModel) => {
            const { partOnDiagram, ...partResources } = {
                ...partModel,
                refNo: partModel.partOnDiagram[0].refNo,
                hotspot: partModel.partOnDiagram[0].hotspot as number[],
                qty: partModel.partOnDiagram[0].qty,
                _links: {
                    self: { href: `/api/parts/${partModel.id}` },
                },
            };
            return partResources;
        });

        response.status(200).send(partResources);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
