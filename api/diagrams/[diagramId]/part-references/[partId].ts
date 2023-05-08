import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PartReferenceResource } from "../../../../types/motorcycles";
import { checkToken } from "../../../_auth";
import { errorHandler, UnsupportedMethodError } from "../../../_error-handler";
import { prisma } from "../../../_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = request.query.diagramId as string;
    const partId = request.query.partId as string;

    if (request.method === "PUT") {
        console.info(
            `Update part reference - diagramId: ${diagramId}, partId: ${partId}`,
        );

        // TODO: this should be put:part-references
        await checkToken(request, "post:comments");

        const partReference: PartReferenceResource = JSON.parse(request.body);

        const partReferenceModel = await prisma.partToDiagram.update({
            where: { partId_diagramId: { partId, diagramId } },
            data: partReference,
        });

        const partReferenceResource: PartReferenceResource = {
            ...partReferenceModel,
            hotspots: partReferenceModel.hotspots as unknown as number[][],
            _links: {
                self: {
                    href: `/api/diagrams/${diagramId}/part-references/${partId}`,
                },
            },
        };

        response.status(200).send(partReferenceResource);
    } else {
        throw new UnsupportedMethodError();
    }
};

export default errorHandler(handler);
