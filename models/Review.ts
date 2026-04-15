import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },
    service: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

const Review = models.Review || model("Review", ReviewSchema);
export default Review;
