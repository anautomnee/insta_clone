import { Application } from "express";
import authRouter from "./authRoutes";
import usersRouter from "./userRoutes";
import postsRouter from "./postRoutes";
import commentRouter from "./commentRoutes";
import messagesRouter from "./messageRoutes";

export const mainRouter = (app: Application) => {
    app.use("/auth", authRouter);
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);
    app.use("/comments", commentRouter);
    app.use("/messages", messagesRouter);

    // Root endpoint
    app.get("/", (_req, res) => {
        res.send("index");
    });
};
