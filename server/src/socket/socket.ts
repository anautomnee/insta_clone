import { Server } from "socket.io";
import http from "http";

export const initializeSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
