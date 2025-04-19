import { Schema, model, models } from "mongoose";

const contactSchema = new Schema<any>({
  address: { type: String, required: true },
  email: { type: String, required: true },
  workingHours: { type: String, required: true },
  phones: [{ type: String }], // array, chunki telefon raqamlar ko‘p bo‘lishi mumkin
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    telegram: { type: String },
    youtube: { type: String }
  },
}, { timestamps: true });

const Contact = models.Contact || model<any>("Contact", contactSchema);
export default Contact;