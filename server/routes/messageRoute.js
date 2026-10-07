import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { getMessagesForUser } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/sidebar-users/:id/messages", userAuth, getMessagesForUser);

export default messageRouter;
