"use server";

import { connectDB } from "@/db/dbConfig";
import Review from "@/models/Review";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReviewAction(formData: FormData) {
    let success = false;

    try {
        await connectDB();

        const name = formData.get("name") as string;
        const date = formData.get("date") as string;
        const text = formData.get("text") as string;
        const service = formData.get("service") as string;
        const stars = Number(formData.get("stars"));

        await Review.create({
            name,
            date,
            text,
            service,
            stars,
        });

        success = true;
    } catch (error) {
        console.error("Review creation failed:", error);
        return { error: "Database failed. Please try again." };
    }

    if (success) {
        revalidatePath("/dental-staff-portal/review");
        redirect("/dental-staff-portal/review");
    }
}

export async function deleteReviewAction(id: string) {
    try {
        await connectDB();

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return { error: "Review not found" };
        }

        revalidatePath("/dental-staff-portal/reviews");
        return { success: true };
    } catch (error) {
        console.error("Delete failed:", error);
        return { error: "Failed to delete review." };
    }
}

export async function updateReviewAction(id: string, formData: FormData) {
    let success = false;
    try {
        await connectDB();

        const name = formData.get("name") as string;
        const date = formData.get("date") as string;
        const text = formData.get("text") as string;
        const service = formData.get("service") as string;
        const stars = Number(formData.get("stars"));

        const updateData = { name, date, text, service, stars };

        await Review.findByIdAndUpdate(id, updateData);
        success = true;
    } catch (error) {
        console.error("Update failed:", error);
        return { error: "Failed to update review" };
    }

    if (success) {
        revalidatePath("/dental-staff-portal/reviews");
        redirect("/dental-staff-portal/reviews");
    }
}
