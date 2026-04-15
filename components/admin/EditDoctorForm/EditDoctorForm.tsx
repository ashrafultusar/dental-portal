"use client";

import { useState, useTransition } from "react";
import { updateDoctorAction } from "@/actions/doctor";
import { X, Loader2, Camera } from "lucide-react";
import Image from "next/image";

// 1. Define the interface for the Doctor data
interface IDoctor {
  _id: string;
  name: string;
  specialty: string;
  experience: string;
  description?: string;
  image?: string;
}

interface EditDoctorFormProps {
  doctor: IDoctor;
}

export default function EditDoctorForm({ doctor }: EditDoctorFormProps) {
  const [preview, setPreview] = useState<string | null>(doctor.image || null);
  const [isPending, startTransition] = useTransition();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      // doctor._id pass kora hocche server action-e
      const res = await updateDoctorAction(doctor._id, formData);
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  return (
    <form 
      action={handleSubmit} 
      className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
    >
      {/* Name Input */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
          Full Name
        </label>
        <input 
          name="name" 
          defaultValue={doctor.name} 
          type="text" 
          required 
          className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" 
          placeholder="e.g. Dr. Ariful Islam"
        />
      </div>

      {/* Specialty & Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Specialty
          </label>
          <input 
            name="specialty" 
            defaultValue={doctor.specialty} 
            type="text" 
            required 
            className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" 
            placeholder="e.g. Orthodontist"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Experience
          </label>
          <input 
            name="experience" 
            defaultValue={doctor.experience} 
            type="text" 
            required 
            className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" 
            placeholder="e.g. 8+ Years"
          />
        </div>
      </div>

      {/* Photo Upload Section */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
          Profile Photo
        </label>
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
            <Image 
              src={preview || "/placeholder-doctor.png"} 
              alt="Preview" 
              fill 
              className="object-cover" 
            />
          </div>
          
          <div className="flex-1">
            <label className="relative cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 transition-all group">
              <Camera size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Change Photo</span>
              <input 
                name="image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-2 ml-1">
              Recommended: Square JPG or PNG, max 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={isPending} 
        className="w-full text-black py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Updating Profile...</span>
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}