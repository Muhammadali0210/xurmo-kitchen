import { Schema, model, models } from "mongoose";
import type { IFood } from "@/types";

const FoodSchema = new Schema<IFood>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Bu yerni doimo ishlating
const Food = models.Food || model<IFood>("Food", FoodSchema);
export default Food;
