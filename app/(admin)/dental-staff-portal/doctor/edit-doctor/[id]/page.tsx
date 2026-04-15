// app/admin/doctors/[id]/edit/page.tsx
import React from 'react';
import { connectDB } from "@/db/dbConfig";
import Doctor from "@/models/Doctor";
import EditDoctorForm from '@/components/admin/EditDoctorForm/EditDoctorForm';
import { notFound } from "next/navigation";

export default async function EditDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();

  const doctor = await Doctor.findById(id).lean();

  if (!doctor) {
    return notFound(); // Standard Next.js 404
  }

  // Convert MongoDB object to plain JS object
  const plainDoctor = {
    ...doctor,
    _id: doctor._id.toString(),
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Edit Doctor Profile</h1>
          <p className="text-slate-500 text-sm">Update the information for {plainDoctor.name}</p>
        </div>

        <EditDoctorForm doctor={plainDoctor} />
      </div>
    </div>
  );
}