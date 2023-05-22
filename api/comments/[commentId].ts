import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
    NotFoundError,
    UnsupportedMethodError,
    errorHandler,
} from "../_error-handler.js";
import { prisma } from "../_prisma.js";
import { CommentResource } from "../../types/motorcycles.js";
import { Descendant } from "slate";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const commentId = Number(request.query.commentId as string);

    if (request.method === "GET") {
        console.info(`Get comment - commentId: ${commentId}`);

        const commentModel = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!commentModel) {
            throw new NotFoundError("Comment not found");
        }

        const commentResource: CommentResource = {
            ...commentModel,
            nodes: commentModel.nodes as unknown as Descendant[],
            motorcycleId: commentModel.motorcycleId || undefined,
            diagramId: commentModel.diagramId || undefined,
            partId: commentModel.partId || undefined,
            createdAt: commentModel.createdAt.toISOString(),
            _links: {
                self: { href: `/api/comments/${commentModel.id}` },
            },
        };

        response.status(200).send(commentResource);
    } else if (request.method === "DELETE") {
        console.info(`Delete comment - commentId: ${commentId}`);

        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        response.status(200).send("Comment deleted");
    } else {
        throw new UnsupportedMethodError();
    }
};

export default errorHandler(handler);
