import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: Number,
  },
  { collection: "users", timestamps: false }
);

const User = mongoose.models.Users || mongoose.model("users", userSchema);

export default User;
