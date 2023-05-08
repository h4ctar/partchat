import { VercelRequest } from "@vercel/node";
import jwt, { GetPublicKeyOrSecret, JwtPayload } from "jsonwebtoken";
import jwks from "jwks-rsa";
import util from "util";
import { ForbiddenError, UnauthorizedError } from "./_error-handler";

type Payload = {
    scope: string;
    username: string;
} & JwtPayload;

export const checkToken = async (
    request: VercelRequest,
    ...scopes: string[]
) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("No authorization header");
    }

    const token = authHeader.split(" ")[1];

    const getPublicKey: GetPublicKeyOrSecret = (header, callback) => {
        const client = jwks({
            jwksUri: `https://${process.env.AUTH0_TENANT}.auth0.com/.well-known/jwks.json`,
        });
        client
            .getSigningKey(header.kid)
            .then((key) => callback(null, key.getPublicKey()))
            .catch((err) => callback(err));
    };

    let jwtPayload;
    try {
        jwtPayload = await verify(token, getPublicKey);
    } catch (err) {
        throw new UnauthorizedError("Could not verify token");
    }

    if (!isPayload(jwtPayload)) {
        throw new UnauthorizedError("Invalid token payload");
    }

    for (const scope of scopes) {
        if (!jwtPayload.scope.includes(scope)) {
            throw new ForbiddenError("Incorrect token scope");
        }
    }

    return jwtPayload;
};

const verify = util.promisify<
    string,
    GetPublicKeyOrSecret,
    JwtPayload | string | undefined
>(jwt.verify);

function isPayload(
    jwtPayload: Payload | string | jwt.JwtPayload | undefined,
): jwtPayload is Payload {
    return (
        typeof (jwtPayload as Payload).scope === "string" &&
        typeof (jwtPayload as Payload).username === "string"
    );
}
