import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const user = model("user", UserSchema);

export default user;
