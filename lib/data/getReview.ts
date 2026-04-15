"use server";

import { connectDB } from "@/db/dbConfig";
import Review from "@/models/Review";

export async function getReviewsAction() {
    try {
        await connectDB();

        // Fetch all reviews from the database
        const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();

        return JSON.parse(JSON.stringify(reviews));
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
    }
}

export async function getReviewByIdAction(id: string) {
    try {
        await connectDB();

        const review = await Review.findById(id).lean();

        if (!review) {
            return null;
        }

        return JSON.parse(JSON.stringify(review));
    } catch (error) {
        console.error("Failed to fetch review by ID:", error);
        return null;
    }
}
