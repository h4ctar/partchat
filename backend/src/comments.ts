import { CommentResource, CommentsResource, PostComment } from "../../types";
import { prisma } from "./prisma";
import { Descendant } from "slate";
import { Prisma } from "@prisma/client";
import { FastifyPluginCallback } from "fastify";

type CommentsQuery = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

type CommentParams = {
    commentId: number;
};

export const commentRoutes: FastifyPluginCallback = async (server) => {
    server.get<{ Querystring: CommentsQuery }>(
        "/api/comments",
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

            const commentsResource: CommentsResource = {
                total: commentModels.length,
                items: commentModels.map((commentModel) => ({
                    id: commentModel.id,
                })),
                _links: {
                    self: { href: `/api/comments` },
                },
            };

            return reply.status(200).send(commentsResource);
        },
    );

    server.get<{ Params: CommentParams }>(
        "/api/comments/:commentId",
        {
            schema: {
                params: {
                    commentId: {
                        type: "number",
                    },
                },
            },
        },
        async (request, reply) => {
            server.log.info(
                `Get comment - commentId: ${request.params.commentId}`,
            );

            const commentModel = await prisma.comment.findUnique({
                where: {
                    id: request.params.commentId,
                },
            });

            if (!commentModel) {
                return reply.status(404).send("Comment not found");
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

            return reply.status(200).send(commentResource);
        },
    );

    server.post<{ Body: PostComment }>(
        "/api/comments",
        async (request, reply) => {
            const postComment = request.body;

            server.log.info(
                `Post new comment - motorcycleId: ${postComment.motorcycleId}, diagramId: ${postComment.diagramId}, partId: ${postComment.partId}`,
            );

            // const jwtPayload = await checkToken(request, "post:comments");

            const commentModel = await prisma.comment.create({
                data: {
                    ...postComment,
                    nodes: JSON.stringify(postComment.nodes),
                    motorcycleId: postComment.motorcycleId || null,
                    diagramId: postComment.diagramId || null,
                    partId: postComment.partId || null,
                    username: "test",
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

            return reply.status(201).send(commentResource);
        },
    );

    server.delete<{ Params: CommentParams }>(
        "/api/comments/:commentId",
        async (request, reply) => {
            server.log.info(
                `Delete comment - commentId: ${request.params.commentId}`,
            );

            // const jwtPayload = await checkToken(request, "delete:comments");

            const commentModel = await prisma.comment.findUnique({
                where: {
                    id: request.params.commentId,
                },
            });

            // if (commentModel?.username !== jwtPayload.username) {
            //     return reply.status(403).send("You don't own this comment");
            // }

            await prisma.comment.delete({
                where: {
                    id: request.params.commentId,
                },
            });

            return reply.status(200).send("Comment deleted");
        },
    );
};
