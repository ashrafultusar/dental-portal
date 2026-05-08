"use client";

import React, { useState, useTransition } from "react";
import { UserRound, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteDoctorAction } from "@/actions/doctor";

interface IDoctor {
  _id: string;
  name: string;
  specialty: string;
  experience: string;
  image?: string;
}

export default function DoctorsList({
  initialDoctors,
}: {
  initialDoctors: IDoctor[];
}) {
  const [doctors, setDoctors] = useState<IDoctor[]>(initialDoctors);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;

    setLoadingId(id);
    startTransition(async () => {
      const res = await deleteDoctorAction(id);
      if (res?.success) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      } else if (res?.error) {
        alert(res.error);
      }
      setLoadingId(null);
    });
  };

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
        No doctors found in the database.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doc: IDoctor) => (
        <div
          key={doc._id}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <Image
                src={doc.image || "/placeholder-doctor.png"}
                alt={doc.name}
                fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 text-lg leading-tight truncate">
                {doc.name}
              </h3>
              <p className="text-teal-600 text-xs font-bold uppercase mt-1">
                {doc.specialty}
              </p>
              <p className="text-slate-400 text-xs mt-2 italic font-medium">
                Exp: {doc.experience}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end gap-3 ">
            <Link
              href={`/dental-staff-portal/doctor/edit-doctor/${doc._id}`}
              className="p-2 text-[#00bba7] "
            >
              <Edit size={18} />
            </Link>

            <button
              onClick={() => handleDelete(doc._id)}
              disabled={loadingId === doc._id}
              className="p-2 text-red-500 transition-colors cursor-pointer  disabled:opacity-50"
            >
              {loadingId === doc._id ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
