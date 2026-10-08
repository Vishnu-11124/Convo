import express from "express";
import "dotenv/config.js";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// socket.io setup
export const io = new Server(server, { cors: { origin: "*" } });

export const userSocketMap = {};

// socket connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected...", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected...", userId);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

connectDB();

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
