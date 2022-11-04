import mongoose from "mongoose";

const notification = new mongoose.Schema({
  message: String,
});

export default mongoose.model("Notification", notification);
