import express, {Application, Request, Response} from 'express';
import 'dotenv/config';
import connectToDb from "./db";
import cors from "cors";
import { CorsOptions } from 'cors';
import authRouter from "./routes/authRoutes";
import usersRouter from "./routes/userRoutes";
import postsRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";

const port: string | number = process.env.PORT || 3000;
let hostIp;
if (process.env.ENV === 'local') {
    hostIp = 'localhost';
} else {
    hostIp = process.env.HOST_IP;
}


const app: Application = express();

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Allow requests from these sources
        if (
            origin === `http://${hostIp}` ||
            origin === `http://${hostIp}:3001` ||
            origin === `http://${hostIp}:5173` ||
            !origin
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    preflightContinue: false,
};

(async function startServer() {

    try {
        await connectToDb();
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/auth', authRouter);
        app.use('/users', usersRouter);
        app.use('/posts', postsRouter);
        app.use('/comments', commentRouter);

        app.get('/', (_req: Request, res: Response) => {
            res.send('index');
        })

        app.listen(Number(port), '0.0.0.0', () => {
            console.log('Server is running on port http://localhost:' + port);
        });

    } catch (error) {
        console.error('Error starting server: ', error);
    }
})();