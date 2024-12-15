import express from 'express';
import 'dotenv/config';
import connectToDb from "./db/index.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import usersRouter from "./routes/userRoutes.js";

const port = process.env.PORT;
let hostIp;
if (process.env.ENV === 'local') {
    hostIp = 'localhost';
} else {
    hostIp = process.env.HOST_IP;
}


const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Разрешаем запросы с этих двух источников
        if (origin === `http://${hostIp}` || origin === `http://${hostIp}:3001` || origin === `http://${hostIp}:5173` || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },  // Use the public IP in production, localhost in development
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


        app.get('/', (req, res) => {
            res.send('index');
        })

        app.listen(port, '0.0.0.0', () => {
            console.log('Server is running on port http://localhost:' + port);
        });

    } catch (error) {
        console.error('Error starting server: ', error);
    }
})();