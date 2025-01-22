import { CorsOptions } from "cors";
import 'dotenv/config';

export const configureCors = (): CorsOptions => {
    const hostIp = process.env.ENV === "local" ? "localhost" : process.env.HOST_IP;
    return {
        origin: `https://${hostIp}`,
        credentials: true,
    };
};
