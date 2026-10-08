import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { getMessagesForUser, markMessagesAsSeen, sendMessage } from "../controllers/messageController.js";
import uplpoad from "../middlewares/multer.js";

const messageRouter = express.Router();

messageRouter.get("/sidebar-users/:id/messages", userAuth, getMessagesForUser);
messageRouter.put('/:id/messages-read', userAuth, markMessagesAsSeen)
messageRouter.post('/user/:id/send-messages', userAuth, uplpoad.single('image'), sendMessage )

export default messageRouter;
