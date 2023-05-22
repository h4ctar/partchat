import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
    CommentResource,
    CommentsResource,
    PostComment,
} from "../../types/motorcycles.js";
import { checkToken } from "../_auth.js";
import { UnsupportedMethodError, errorHandler } from "../_error-handler.js";
import { prisma } from "../_prisma.js";
import { Descendant } from "slate";
import { Prisma } from "@prisma/client";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const motorcycleId = (request.query.motorcycleId as string) || undefined;
    const diagramId = (request.query.diagramId as string) || undefined;
    const partId = (request.query.partId as string) || undefined;

    if (request.method === "GET") {
        console.info(
            `Get all comments - motorcycleId: ${motorcycleId}, diagramId: ${diagramId}, partId: ${partId}`,
        );

        const commentModels = await prisma.comment.findMany({
            where: {
                motorcycleId,
                diagramId,
                partId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const commentsResource: CommentsResource = {
            total: commentModels.length,
            items: commentModels.map((commentModel) => ({
                id: commentModel.id,
            })),
            _links: {
                self: { href: `/api/comments` },
            },
        };

        response.status(200).send(commentsResource);
    } else if (request.method === "POST") {
        console.info(
            `Post new comment - motorcycleId: ${motorcycleId}, diagramId: ${diagramId}, partId: ${partId}`,
        );

        const jwtPayload = await checkToken(request, "post:comments");

        const postComment: PostComment = JSON.parse(request.body);

        const commentModel = await prisma.comment.create({
            data: {
                ...postComment,
                nodes: postComment.nodes as unknown as Prisma.JsonArray,
                motorcycleId: postComment.motorcycleId || null,
                diagramId: postComment.diagramId || null,
                partId: postComment.partId || null,
                username: jwtPayload.username,
            },
        });

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

        response.status(201).send(commentResource);
    } else {
        throw new UnsupportedMethodError();
    }
};

export default errorHandler(handler);
