"use server";

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // আপনার auth ফাইল থেকে ইমপোর্ট করুন

export async function registerAction(formData: FormData) {
    try {
        // ১. সিকিউরিটি চেক: বর্তমানে লগইন করা ইউজার অ্যাডমিন কি না
        const session = await auth();
        if (!session || session.user?.role !== "admin") {
            return { success: false, message: "Unauthorized: Only admins can create new staff." };
        }

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = (formData.get("role") as string) || "user"; // ফর্ম থেকে রোল নিলে সেটি সেট হবে

        if (!name || !email || !password) {
            return { success: false, message: "All fields are required" };
        }

        await connectDB();

        // ইমেইল অলরেডি আছে কি না চেক
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // নতুন ইউজার তৈরি
        await User.create({
            name,
            email,
            password: hashedPassword,
            role, 
        });

        // ড্যাশবোর্ড লিস্ট আপডেট করার জন্য রিভ্যালিডেট
        revalidatePath("/dental-staff-portal");
        
        return { success: true, message: "New staff registered successfully" };
    } catch (error: unknown) {
        console.error("Error registering user:", error);
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return { success: false, message: errorMessage };
    }
}

export async function updateUserRole(userId: string, newRole: string) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "admin") {
            return { success: false, message: "Unauthorized action" };
        }

        await connectDB();
        await User.findByIdAndUpdate(userId, { role: newRole });
        revalidatePath("/dental-staff-portal");
        return { success: true, message: "Role updated successfully" };
    } catch (error) {
        return { success: false, message: "Update failed" };
    }
}

export async function deleteUser(userId: string) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "admin") {
            return { success: false, message: "Unauthorized action" };
        }

        await connectDB();
        await User.findByIdAndDelete(userId);
        revalidatePath("/dental-staff-portal");
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        return { success: false, message: "Deletion failed" };
    }
}