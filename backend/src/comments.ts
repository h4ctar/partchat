import { CommentResource, Id, PostComment } from "@partchat/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Forbidden } from "http-errors";
import { z } from "zod";
import { checkToken } from "./auth";
import { prisma } from "./prisma";

export const commentRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get(
        "/api/comments",
        {
            schema: {
                querystring: z.object({
                    motorcycleId: Id.optional(),
                    diagramId: Id.optional(),
                    partId: Id.optional(),
                }),
            },
        },
        async (request, reply) => {
            server.log.info(
                `Get all comments - motorcycleId: ${request.query.motorcycleId}, diagramId: ${request.query.diagramId}, partId: ${request.query.partId}`,
            );

            const commentModels = await prisma.comment.findMany({
                where: {
                    motorcycleId: request.query.motorcycleId,
                    diagramId: request.query.diagramId,
                    partId: request.query.partId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            const commentResources: CommentResource[] = commentModels.map(
                (commentModel) => ({
                    ...commentModel,
                    id: commentModel.id.toString(),
                    nodes: JSON.parse(commentModel.nodes) as object[],
                    motorcycleId: commentModel.motorcycleId || undefined,
                    diagramId: commentModel.diagramId || undefined,
                    partId: commentModel.partId || undefined,
                    createdAt: commentModel.createdAt.toISOString(),
                }),
            );

            return reply.status(200).send(commentResources);
        },
    );

    server.get(
        "/api/comments/:commentId",
        {
            schema: {
                params: z.object({
                    commentId: Id,
                }),
            },
        },
        async (request, reply) => {
            server.log.info(
                `Get comment - commentId: ${request.params.commentId}`,
            );

            const commentModel = await prisma.comment.findUnique({
                where: {
                    id: parseInt(request.params.commentId),
                },
            });

            if (!commentModel) {
                return reply.status(404).send("Comment not found");
            }

            const commentResource: CommentResource = {
                ...commentModel,
                id: commentModel.id.toString(),
                nodes: JSON.parse(commentModel.nodes) as object[],
                motorcycleId: commentModel.motorcycleId || undefined,
                diagramId: commentModel.diagramId || undefined,
                partId: commentModel.partId || undefined,
                createdAt: commentModel.createdAt.toISOString(),
                _links: {
                    self: { href: `/api/comments/${commentModel.id}` },
                },
            };

            return reply.status(200).send(commentResource);
        },
    );

    server.post(
        "/api/comments",
        {
            schema: {
                body: PostComment,
            },
        },
        async (request, reply) => {
            const user = await checkToken(request, "edit:comments");

            const postComment = request.body;
            server.log.info(
                `Post new comment - motorcycleId: ${postComment.motorcycleId}, diagramId: ${postComment.diagramId}, partId: ${postComment.partId}`,
            );

            const commentModel = await prisma.comment.create({
                data: {
                    ...postComment,
                    nodes: JSON.stringify(postComment.nodes),
                    motorcycleId: postComment.motorcycleId || null,
                    diagramId: postComment.diagramId || null,
                    partId: postComment.partId || null,
                    username: user.username,
                },
            });

            const commentResource: CommentResource = {
                ...commentModel,
                id: commentModel.id.toString(),
                nodes: JSON.parse(commentModel.nodes) as object[],
                motorcycleId: commentModel.motorcycleId || undefined,
                diagramId: commentModel.diagramId || undefined,
                partId: commentModel.partId || undefined,
                createdAt: commentModel.createdAt.toISOString(),
                _links: {
                    self: { href: `/api/comments/${commentModel.id}` },
                },
            };

            return reply.status(201).send(commentResource);
        },
    );

    server.delete(
        "/api/comments/:commentId",
        {
            schema: {
                params: z.object({
                    commentId: Id,
                }),
            },
        },
        async (request, reply) => {
            const user = await checkToken(request, "edit:comments");

            server.log.info(
                `Delete comment - commentId: ${request.params.commentId}`,
            );

            const commentModel = await prisma.comment.findUnique({
                where: {
                    id: parseInt(request.params.commentId),
                },
            });

            if (commentModel?.username !== user.username) {
                throw new Forbidden("You don't own this comment");
            }

            await prisma.comment.delete({
                where: {
                    id: parseInt(request.params.commentId),
                },
            });

            return reply.status(200).send("Comment deleted");
        },
    );
};
