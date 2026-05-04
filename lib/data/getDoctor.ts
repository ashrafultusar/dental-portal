"use server";

import { connectDB } from "@/db/dbConfig";
import Doctor from "@/models/Doctor";



export async function getDoctorsAction() {
  try {
    await connectDB();

    // Database theke shob doctor find kora
    // .lean() use kora hoyeche jate Plain JavaScript Object pawa jay (faster)
    const doctors = await Doctor.find({}).sort({ createdAt: -1 }).lean();

    // MongoDB-r _id ke string-e convert kora (Next.js client component error avoid korar jonno)
    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}

export async function getDoctorByIdAction(id: string) {
  try {
    await connectDB();
    const doctor = await Doctor.findById(id).lean();
    if (!doctor) return null;
    return JSON.parse(JSON.stringify(doctor));
  } catch (error) {
    console.error("Failed to fetch doctor by id:", error);
    return null;
  }
}