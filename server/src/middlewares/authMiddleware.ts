import jwt from 'jsonwebtoken';
import {NextFunction, Response, Request} from "express";
import {TokenPayload} from "../types/express";

const ifAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.headers.authorization && process.env.JWT_KEY) {
        const authHeader = req.headers.authorization.split(' ')[1]; // Extract token

        if (authHeader) {
            jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    console.error('JWT verification failed:', err);
                    res.status(403).send('Forbidden: Invalid or expired token');
                    return;
                }
                req.user = decoded as TokenPayload; // Attach decoded token to the request
                next(); // Pass control to the next middleware
            });
        } else {
            res.status(401).send('Unauthorized: Token missing');
        }
    } else {
        res.status(401).send('Unauthorized: No authorization header or missing JWT key');
    }
};

export default ifAuthenticated;