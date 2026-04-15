"use server"; 

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";

export async function getAllUsers() {
  try {
    await connectDB();
    // Use the model to find users
    const users = await User.find({}).sort({ createdAt: -1 }); 
    
    // Convert Mongoose documents to plain objects for the client
    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, message: "Failed to fetch users" };
  }
}