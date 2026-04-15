"use server";

import { uploadImage } from '@/lib/cloudinary';
import { connectDB } from "@/db/dbConfig";
import Service from "@/models/Service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServiceAction(formData: FormData) {
    let success = false;

    try {
        await connectDB();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const icon = formData.get("icon") as string;
        const imageFile = formData.get("image") as File;

        let imageUrl = "";
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile, "services");
        }

        await Service.create({
            title,
            description,
            price,
            icon,
            image: imageUrl,
        });

        success = true;
    } catch (error) {
        console.error("Service creation failed:", error);
        return { error: "Database or Upload failed. Please try again." };
    }

    if (success) {
        revalidatePath("/dental-staff-portal/services");
        redirect("/dental-staff-portal/services");
    }
}


export async function deleteServiceAction(id: string) {
    try {
        await connectDB();

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return { error: "Service not found" };
        }

        revalidatePath("/dental-staff-portal/services");
        return { success: true };
    } catch (error) {
        console.error("Delete failed:", error);
        return { error: "Failed to delete service." };
    }
}


export async function updateServiceAction(id: string, formData: FormData) {
    let success = false;
    try {
        await connectDB();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const icon = formData.get("icon") as string;
        const imageFile = formData.get("image") as File;

        const updateData: any = { title, description, price, icon };

        if (imageFile && imageFile.size > 0) {
            const imageUrl = await uploadImage(imageFile, "services");
            updateData.image = imageUrl;
        }

        await Service.findByIdAndUpdate(id, updateData);
        success = true;
    } catch (error) {
        console.error("Update failed:", error);
        return { error: "Failed to update service" };
    }

    if (success) {
        revalidatePath("/dental-staff-portal/services");
        redirect("/dental-staff-portal/services");
    }
}
