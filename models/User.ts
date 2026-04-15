import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false, // Security standard: don't return password by default
        },
        role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user",
        },
        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
    },
    {
        timestamps: true,
    }
);

// Verify if model exists to prevent OverwriteModelError in Next.js HMR
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
