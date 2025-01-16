import jwt, {JwtPayload, VerifyErrors} from 'jsonwebtoken';
import {NextFunction, Response, Request} from "express";
import {TokenPayload} from "../types/express";

const ifAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token; // Extract the token from cookies
    if (token && process.env.JWT_KEY) {
        jwt.verify(token, process.env.JWT_KEY, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
                res.status(403).send('Forbidden: Invalid or expired token');
                return;
            }
            req.user = decoded as TokenPayload; // Attach decoded token to the request
            next(); // Pass control to the next middleware
        });
    } else {
        if (req.url !== '/check-access-token') {
            res.status(401).send('Unauthorized: Token missing or invalid');
            return;
        } else {
            next();
        }
    }
};

export default ifAuthenticated;