import { CorsOptions } from "cors";
import 'dotenv/config';

export const configureCors = (): CorsOptions => {
    const clientHost = process.env.ENV === "local" ? "http://localhost" : process.env.CLIENT_HOST;
    return {
        origin: `${clientHost}`,
        credentials: true,
    };
};
