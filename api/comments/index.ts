import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CommentResource } from "../../types/motorcycles";
import { COMMENTS } from "../../prisma/_data";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    const diagramId = (request.query.diagramId as string) || undefined;
    const commentId = (request.query.commentId as string) || undefined;

    if (request.method === "GET") {
        console.info("Get all comments");

        if (diagramId) {
            const comments: CommentResource[] = COMMENTS.filter(
                (comment) => comment.diagramId === diagramId,
            ).map((comment) => ({
                ...comment,
                _links: {
                    self: { href: `/api/comments/${comment.id}` },
                },
            }));

            response.status(200).send(comments);
        } else if (commentId) {
            const comments: CommentResource[] = COMMENTS.filter(
                (comment) => comment.commentId === commentId,
            ).map((comment) => ({
                ...comment,
                _links: {
                    self: { href: `/api/comments/${comment.id}` },
                },
            }));

            response.status(200).send(comments);
        } else {
            const comments: CommentResource[] = COMMENTS.map((comment) => ({
                ...comment,
                _links: {
                    self: { href: `/api/comments/${comment.id}` },
                },
            }));
            response.status(200).send(comments);
        }
    } else {
        throw new Error("Unsupported method");
    }
};

export default handler;
