import { VercelRequest } from "@vercel/node";
import jwt, { GetPublicKeyOrSecret, JwtPayload } from "jsonwebtoken";
import jwks from "jwks-rsa";
import util from "util";

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
    }
}

type ScopePayload = {
    scope: string;
};

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

    for (const scope of scopes) {
        if (hasScope(jwtPayload)) {
            if (!jwtPayload.scope.includes(scope)) {
                throw new ForbiddenError("Incorrect token scope");
            }
        } else {
            throw new ForbiddenError("Incorrect token scope");
        }
    }
};

const verify = util.promisify<
    string,
    GetPublicKeyOrSecret,
    JwtPayload | string | undefined
>(jwt.verify);

function hasScope(
    pet: ScopePayload | string | jwt.JwtPayload | undefined,
): pet is ScopePayload {
    return (pet as ScopePayload).scope !== undefined;
}
