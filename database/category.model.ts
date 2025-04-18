import { Schema, model, models } from "mongoose";
import type { ICategory } from "@/types";

const CategorySchema = new Schema<ICategory>(
  {
    name: String,
    type: String
  },
  { timestamps: true }
);

// Bu yerni doimo ishlating
const Category = models.Category || model<ICategory>("Category", CategorySchema);
export default Category;
