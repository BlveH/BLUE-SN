import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("DB connect successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};
