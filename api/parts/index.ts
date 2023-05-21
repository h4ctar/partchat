import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PartResource } from "../../types/motorcycles.js";
import { prisma } from "../_prisma.js";
import { UnsupportedMethodError } from "../_error-handler.js";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = (request.query.diagramId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get all parts");

        const partModels = await prisma.part.findMany({
            where: {
                partOnDiagrams: {
                    some: { diagramId },
                },
            },
            include: {
                partOnDiagrams: !!diagramId,
            },
        });

        if (diagramId) {
            const partResources: PartResource[] = partModels
                .map((partModel) => {
                    // Do this destructure so that the partOnDiagrams is not included in the response resources
                    const { partOnDiagrams: _, ...partResources } = {
                        ...partModel,
                        refNo: partModel.partOnDiagrams[0].refNo,
                        hotspots: partModel.partOnDiagrams[0]
                            .hotspots as number[][],
                        qty: partModel.partOnDiagrams[0].qty,
                        _links: {
                            self: { href: `/api/parts/${partModel.id}` },
                        },
                    };
                    return partResources;
                })
                .sort((a, b) => a.refNo - b.refNo);

            response.status(200).send(partResources);
        } else {
            const partResources: PartResource[] = partModels
                .map((partModel) => {
                    const partResources = {
                        ...partModel,
                        _links: {
                            self: { href: `/api/parts/${partModel.id}` },
                        },
                    };
                    return partResources;
                })
                .sort((a, b) => a.partNumber.localeCompare(b.partNumber));

            response.status(200).send(partResources);
        }
    } else {
        throw new UnsupportedMethodError();
    }
};

export default handler;
