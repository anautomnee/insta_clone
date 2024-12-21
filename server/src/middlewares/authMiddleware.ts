import jwt from 'jsonwebtoken';
import {NextFunction, Response, Request} from "express";
import {TokenPayload} from "../types/express";

const ifAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && process.env.JWT_KEY) {
        const authHeader = req.headers.authorization.split(' ')[1];
        if (authHeader) {
            jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
                if(err) {
                    return res.status(403).send('Forbidden: invalid or expired token');
                }

                req.user = decoded as TokenPayload;
                next();
            })
        }
    }
};

export default ifAuthenticated;