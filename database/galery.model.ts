import { Schema, model, models } from "mongoose";
import type { IGalery } from "@/types";

const GalerySchema = new Schema<IGalery>(
  {
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

// Bu yerni doimo ishlating
const Galery = models.Galery || model<IGalery>("Galery", GalerySchema);
export default Galery;

