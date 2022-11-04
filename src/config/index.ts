import mongoose from "mongoose";

const post = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
  published: Boolean,
});

export default mongoose.model("Post", post);
