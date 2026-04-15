"use client";

import { useState, useTransition } from "react";
import { createDoctorAction } from "@/actions/doctor";
import { ImageIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function DoctorUploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
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

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createDoctorAction(formData);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Doctor</h2>
      
      <form action={clientAction} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1.5 text-slate-700">Doctor Name</label>
            <input name="name" type="text" required className="w-full border text-black border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Dr. Rahim Uddin" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700">Specialty</label>
            <input name="specialty" type="text" required className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Oral Surgery" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700">Experience</label>
            <input name="experience" type="text" required className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="10 Years" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Description</label>
          <textarea name="description" rows={3} className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Short bio..." />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700">Doctor Photo</label>
          <div className="relative">
            <label className={`flex flex-col items-center justify-center w-full text-black h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-teal-50 transition-all ${preview ? 'hidden' : ''}`}>
              <ImageIcon className="w-10 h-10 mb-2 text-slate-400" />
              <span className="text-sm text-slate-500">Click to upload</span>
              <input id="imageInput" name="image" type="file" accept="image/*" required className="hidden" onChange={handleImageChange} />
            </label>
            
            {preview && (
              <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-teal-500">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <button 
                  type="button" 
                  onClick={() => {
                    setPreview(null);
                    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }} 
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPending ? <><Loader2 className="animate-spin" /> Saving...</> : "Upload Doctor Profile"}
        </button>
      </form>
    </div>
  );
}