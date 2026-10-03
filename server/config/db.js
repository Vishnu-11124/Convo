import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
