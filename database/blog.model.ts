import mongoose, { Schema, model, models } from "mongoose";

interface IBlog {
  title: string;
  description: string;
  image: string;
  userId: string;
  likes: number;
}

// Blog schema ni e'lon qilish
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    userId: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Bu yerni doimo ishlating
const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;
