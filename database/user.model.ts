import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        image: String,
    },
    { timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User