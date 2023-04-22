import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CommentResource, PostComment } from "../../types/motorcycles";
import { checkToken } from "../_auth";
import { errorHandler } from "../_error-handler";
import { prisma } from "../_prisma";
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

        const commentResources: CommentResource[] = commentModels.map(
            (commentModel) => ({
                ...commentModel,
                nodes: commentModel.nodes as unknown as Descendant[],
                motorcycleId: commentModel.motorcycleId || undefined,
                diagramId: commentModel.diagramId || undefined,
                partId: commentModel.partId || undefined,
                createdAt: commentModel.createdAt.toISOString(),
                _links: {
                    self: { href: `/api/comments/${commentModel.id}` },
                },
            }),
        );

        response.status(200).send(commentResources);
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
        throw new Error("Unsupported method");
    }
};

export default errorHandler(handler);
