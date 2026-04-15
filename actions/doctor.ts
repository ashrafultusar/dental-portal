"use server";

import { uploadImage } from '@/lib/cloudinary';
import { connectDB } from "@/db/dbConfig";
import Doctor from "@/models/Doctor";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDoctorAction(formData: FormData) {
  let success = false;

  try {
    await connectDB();

    const name = formData.get("name") as string;
    const specialty = formData.get("specialty") as string;
    const experience = formData.get("experience") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "doctors");
    }

    await Doctor.create({
      name,
      specialty,
      experience,
      description,
      image: imageUrl,
    });

    success = true;
  } catch (error) {
    console.error("Doctor creation failed:", error);
    return { error: "Database or Upload failed. Please try again." };
  }

  if (success) {
    revalidatePath("/dental-staff-portal/doctor");
    redirect("/dental-staff-portal/doctor");
  }
}


export async function deleteDoctorAction(id: string) {
  try {
    await connectDB();
    
    // Database theke doctor delete kora
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return { error: "Doctor not found" };
    }

    // List refresh korar jonno cache clear kora
    revalidatePath("/dental-staff-portal/doctor");
    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { error: "Failed to delete doctor profile." };
  }
}


export async function updateDoctorAction(id: string, formData: FormData) {
  let success = false;
  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const specialty = formData.get("specialty") as string;
    const experience = formData.get("experience") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    const updateData: any = { name, specialty, experience, description };

    // Jodi notun image upload kora hoy
    if (imageFile && imageFile.size > 0) {
      const imageUrl = await uploadImage(imageFile, "doctors");
      updateData.image = imageUrl;
    }

    await Doctor.findByIdAndUpdate(id, updateData);
    success = true;
  } catch (error) {
    console.error("Update failed:", error);
    return { error: "Failed to update doctor profile" };
  }

  if (success) {
    revalidatePath("/dental-staff-portal/doctor");
    redirect("/dental-staff-portal/doctor");
  }
}