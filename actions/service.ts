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

        const imageFiles = formData.getAll("images") as File[];
        const imageUrls: string[] = [];

        for (const file of imageFiles) {
            if (file && file.size > 0) {
                const url = await uploadImage(file, "services");
                imageUrls.push(url);
            }
        }

        await Service.create({
            title,
            description,
            price,
            icon,
            image: imageUrls.length > 0 ? imageUrls[0] : "",
            images: imageUrls,
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

        // Use existing image or array
        const updateData: any = { title, description, price, icon };

        const imageFiles = formData.getAll("images") as File[];
        const newImageUrls: string[] = [];

        for (const file of imageFiles) {
            if (file && file.size > 0) {
                const url = await uploadImage(file, "services");
                newImageUrls.push(url);
            }
        }

        // Single image backward compatibility fallback if single image input is used
        const singleImageFile = formData.get("image") as File;
        if (singleImageFile && singleImageFile.size > 0) {
            const url = await uploadImage(singleImageFile, "services");
            newImageUrls.push(url);
        }

        const existingImages = formData.getAll("existingImages") as string[];

        // Include previously uploaded existing images plus new image uploads
        const finalImages = [...(existingImages || []), ...newImageUrls];

        if (finalImages.length > 0) {
            updateData.images = finalImages;
            updateData.image = finalImages[0];
        } else if (newImageUrls.length > 0) {
            updateData.images = newImageUrls;
            updateData.image = newImageUrls[0];
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
