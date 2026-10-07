import Message from "../models/messageModel.js";
import MyChat from "../models/myChatModel.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const usersList = await MyChat.findOne({ userId }).populate(
    "users",
    "fullName profileImage",
  );

  res
    .status(200)
    .json(new ApiResponse(200, usersList, "Users list fetched successfully"));
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