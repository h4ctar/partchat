import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CommentResource, PostComment } from "../../types/motorcycles";
import { prisma } from "../_prisma";

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
            `Post new comments - motorcycleId: ${motorcycleId}, diagramId: ${diagramId}, partId: ${partId}`,
        );

        const postComment: PostComment = JSON.parse(request.body);

        const commentModel = await prisma.comment.create({
            data: {
                ...postComment,
                motorcycleId: postComment.motorcycleId || null,
                diagramId: postComment.diagramId || null,
                partId: postComment.partId || null,
                // TODO: get username from token
                username: "Ben",
            },
        });

        const commentResource: CommentResource = {
            ...commentModel,
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

export default handler;
