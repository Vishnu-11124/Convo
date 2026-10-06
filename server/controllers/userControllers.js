import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

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

export const userLogin = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new ApiError(400, "Provide all the required data");
  }

  const normalizedPhone = phone.trim();

  if (!/^[0-9]{10}$/.test(normalizedPhone)) {
    throw new ApiError(400, "Invalid phone number");
  }

  const userExists = await User.findOne({ phone: normalizedPhone });

  if (!userExists) {
    throw new ApiError(401, "Invalid phone number or password");
  }

  const isPasswordValid = await bcrypt.compare(password, userExists.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid phone number or password");
  }

  const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const userData = {
    id: userExists._id,
    fullName: userExists.fullName,
    phone: userExists.phone,
    profileImage: userExists.profileImage,
    bio: userExists.bio,
    token,
  };

  res
    .status(200)
    .json(new ApiResponse(200, userData, "User logged in successfully"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const userData = await User.findById(userId).select("-password");
  if (!userData) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userData, "Successfully fetched user details"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio } = req.body;
  const imageFile = req.file;
  const userId = req.userId;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (fullName !== undefined) {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      throw new ApiError(400, "Full name cannot be empty");
    }

    user.fullName = trimmedName;
  }

  if (bio !== undefined) {
    user.bio = bio.trim();
  }

  if (imageFile) {
    const result = await cloudinary.uploader.upload(imageFile.path);

    user.profileImage = result.secure_url;
  }

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});