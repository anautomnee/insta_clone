import { CorsOptions } from "cors";
import 'dotenv/config';

export const configureCors = (): CorsOptions => {
    //const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const hostIp = process.env.ENV === "local" ? "localhost" : process.env.HOST_IP;
    return {
        origin: (origin, callback) => {
            //console.log('Host ip is ', hostIp, 'origin is ', origin);
            if (
                origin === `https://${hostIp}` || !origin
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Set-Cookie"],
        preflightContinue: false,
        credentials: true,
    };
};
