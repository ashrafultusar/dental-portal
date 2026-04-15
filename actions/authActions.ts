"use server";

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerAction(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            return { success: false, message: "All fields are required" };
        }

        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User with this email already exists" };
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return { success: true, message: "User registered successfully" };
    } catch (error: unknown) {
        console.error("Error registering user:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        
        return { success: false, message: errorMessage };
    }
}
