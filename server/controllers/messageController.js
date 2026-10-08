import Message from "../models/messageModel.js";
import MyChat from "../models/myChatModel.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const usersList = await MyChat.findOne({ userId }).populate(
    "users",
    "fullName profileImage",
  );

  const users = await Promise.all(
    usersList?.users.map(async (user) => {
      const lastMessage = await Message.findOne({
        $or: [
          {
            senderId: userId,
            receiverId: user._id,
          },
          {
            senderId: user._id,
            receiverId: userId,
          },
        ],
      }).sort({ createdAt: -1 });

      return {
        ...user.toObject(),
        lastMessage: lastMessage?.message || "",
      };
    }) || [],
  );

  res
    .status(200)
    .json(new ApiResponse(200, users, "Users list fetched successfully"));
});

export const getMessagesForUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const senderData = await User.findById(id).select("fullName profileImage");

  if (!senderData) {
    throw new ApiError(404, "User not found");
  }

  const messageList = await Message.find({
    $or: [
      { senderId: userId, receiverId: id },
      { senderId: id, receiverId: userId },
    ],
  }).sort({ createdAt: 1 });

  await Message.updateMany(
    {
      senderId: id,
      receiverId: userId,
      seen: false,
    },
    {
      seen: true,
    },
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messageList, senderData },
        "Messages fetched successfully",
      ),
    );
});

export const markMessagesAsSeen = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const message = await Message.findOneAndUpdate(
    {
      _id: id,
      receiverId: userId,
    },
    {
      seen: true,
    },
    {
      new: true,
    },
  );

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Message marked as seen successfully"));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const imageFile = req.file;
  const userId = req.userId;
  const { id } = req.params;

  if (!text?.trim() && !imageFile) {
    throw new ApiError(400, "Message cannot be empty");
  }

  let imageUrl = null;

  if (imageFile) {
    const result = await cloudinary.uploader.upload(imageFile.path);
    imageUrl = result.secure_url;
  }

  const newMessage = await Message.create({
    senderId: userId,
    receiverId: id,
    text: text?.trim() || "",
    image: imageUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});