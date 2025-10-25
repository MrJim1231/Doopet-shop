import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
