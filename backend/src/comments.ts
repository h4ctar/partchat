import { FastifyPluginCallback } from "fastify";
import { Forbidden } from "http-errors";
import {
    CommentResource,
    CommentsResource,
    Id,
    PostComment,
} from "../../types";
import { User, authenticate } from "./auth";
import { prisma } from "./prisma";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

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
        {
            schema: {
                querystring: {
                    motorcycleId: zodToJsonSchema(Id.optional()),
                    diagramId: zodToJsonSchema(Id.optional()),
                    partId: zodToJsonSchema(Id.optional()),
                },
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
                    commentId: zodToJsonSchema(z.number().int()),
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

    server.post<{ Body: PostComment }>(
        "/api/comments",
        {
            preValidation: authenticate(server, "post:comments"),
            schema: {
                body: zodToJsonSchema(PostComment),
            },
        },
        async (request, reply) => {
            const postComment = request.body;
            const user = request.user as User;

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

    server.delete<{ Params: CommentParams }>(
        "/api/comments/:commentId",
        {
            preValidation: authenticate(server, "delete:comments"),
            schema: {
                params: {
                    commentId: zodToJsonSchema(z.number().int()),
                },
            },
        },
        async (request, reply) => {
            const user = request.user as User;

            server.log.info(
                `Delete comment - commentId: ${request.params.commentId}`,
            );

            const commentModel = await prisma.comment.findUnique({
                where: {
                    id: request.params.commentId,
                },
            });

            if (commentModel?.username !== user.username) {
                throw new Forbidden("You don't own this comment");
                // return reply.status(403).send("You don't own this comment");
            }

            await prisma.comment.delete({
                where: {
                    id: request.params.commentId,
                },
            });

            return reply.status(200).send("Comment deleted");
        },
    );
};
