import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("DB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB successfully connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
};
