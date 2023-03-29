import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CommentResource } from "../../types/motorcycles";
import { prisma } from "../_prisma";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = (request.query.motorcycleId as string) || undefined;
    const diagramId = (request.query.diagramId as string) || undefined;
    const partId = (request.query.partId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get all comments");

        const commentModels = await prisma.comment.findMany({
            where: {
                motorcycleId,
                diagramId,
                partId,
            },
        });

        const commentResources: CommentResource[] = commentModels.map(
            (commentModel) => ({
                ...commentModel,
                createdAt: commentModel.createdAt.toISOString(),
                _links: {
                    self: { href: `/api/comments/${commentModel.id}` },
                },
            }),
        );

        response.status(200).send(commentResources);
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
