import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { getMessagesForUser, markMessagesAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/sidebar-users/:id/messages", userAuth, getMessagesForUser);
messageRouter.put('/:id/messages-read', userAuth, markMessagesAsSeen)

export default messageRouter;
