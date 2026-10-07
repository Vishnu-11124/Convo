import express from "express";
import "dotenv/config.js";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";

const app = express();
const server = http.createServer(app);

connectDB()

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
