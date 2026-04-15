"use server";

import { connectDB } from "@/db/dbConfig";
import Service from "@/models/Service";

export async function getServicesAction() {
    try {
        await connectDB();

        // Fetch all services from the database
        const services = await Service.find({}).sort({ createdAt: -1 }).lean();

        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return [];
    }
}

export async function getServiceByIdAction(id: string) {
    try {
        await connectDB();

        const service = await Service.findById(id).lean();

        if (!service) {
            return null;
        }

        return JSON.parse(JSON.stringify(service));
    } catch (error) {
        console.error("Failed to fetch service by ID:", error);
        return null;
    }
}
