import User from "../models/userModel";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = asyncHandler(async (req, res) => {
  const { fullName, phone, password } = req.body;

  if (!fullName || !phone || !password) {
    throw new ApiError(400, "Provide all the required data");
  }

  const normalizedPhone = phone.trim();

  if (!/^[0-9]{10}$/.test(normalizedPhone)) {
    throw new ApiError(400, "Invalid phone number");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  const userExists = await User.findOne({ phone: normalizedPhone });

  if (userExists) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName: fullName.trim(),
    phone: normalizedPhone,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const userData = {
    id: user._id,
    fullName: user.fullName,
    phone: user.phone,
    profileImage: user.profileImage,
    bio: user.bio,
    token,
  };

  res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully"));
});