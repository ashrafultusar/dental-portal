import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  experience: { type: String },
  university: { type: String },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export default Doctor;