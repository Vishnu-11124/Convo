import MyChat from "../models/myChatModel.js";
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