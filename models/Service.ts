import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    icon: { type: String },
}, { timestamps: true });

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
