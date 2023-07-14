import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connect successful");
  } catch (err) {
    console.log("", err);
  }
};
