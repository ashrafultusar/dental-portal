"use client";

import { useState, useTransition, useRef } from "react";
import { updateDoctorAction } from "@/actions/doctor";
import { X, Loader2, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IDoctor {
  _id: string;
  name: string;
  specialty?: string;
  experience?: string;
  university?: string;
  description?: string;
  image?: string;
}

interface EditDoctorFormProps {
  doctor: IDoctor;
}

// Upload directly from browser to Cloudinary — bypasses Vercel body size limit
async function uploadToCloudinary(file: File): Promise<string> {
  const sigRes = await fetch("/api/upload/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "doctors" }),
  });
  if (!sigRes.ok) throw new Error("Failed to get upload signature");
  const { signature, timestamp, cloudName, apiKey, folder } = await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("signature", signature);
  fd.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: fd }
  );
  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }
  const data = await uploadRes.json();
  return data.secure_url as string;
}

export default function EditDoctorForm({ doctor }: EditDoctorFormProps) {
  const router = useRouter();

  // preview: shows either existing URL or newly selected file blob URL
  const [preview, setPreview] = useState<string | null>(doctor.image || null);
  const [newFile, setNewFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = uploading || isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setNewFile(file);
    setPreview(URL.createObjectURL(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = () => {
    if (preview && newFile) URL.revokeObjectURL(preview);
    setPreview(null);
    setNewFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setUploadError(null);
    setUploading(true);

    try {
      // If a new file is selected, upload it directly to Cloudinary
      if (newFile) {
        const imageUrl = await uploadToCloudinary(newFile);
        formData.delete("image");
        formData.set("imageUrl", imageUrl);
      } else if (preview) {
        // Keep existing image URL
        formData.delete("image");
        formData.set("imageUrl", preview);
      } else {
        formData.delete("image");
      }

      setUploading(false);

      startTransition(async () => {
        const res = await updateDoctorAction(doctor._id, formData);
        if (res?.error) {
          setUploadError(res.error);
        } else {
          setSuccess(true);
          router.refresh();
        }
      });
    } catch (err) {
      setUploading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Image upload failed. Please try again.";
      setUploadError(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
    >
      {/* Error Banner */}
      {uploadError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-sm">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          <span>Doctor profile updated successfully! Redirecting…</span>
        </div>
      )}

      {/* Name */}
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

      {/* Specialty, Experience & University */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Specialty (Optional)
          </label>
          <input
            name="specialty"
            defaultValue={doctor.specialty}
            type="text"
            className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            placeholder="e.g. Orthodontist"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Experience (Optional)
          </label>
          <input
            name="experience"
            defaultValue={doctor.experience}
            type="text"
            className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            placeholder="e.g. 8+ Years"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            University (Optional)
          </label>
          <input
            name="university"
            defaultValue={doctor.university}
            type="text"
            className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            placeholder="e.g. Dhaka Dental College"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          defaultValue={doctor.description}
          rows={3}
          className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
          placeholder="Brief bio or description…"
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
          Profile Photo
        </label>
        <div className="flex items-center gap-6">
          {/* Preview */}
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0 group">
            <Image
              src={preview || "/placeholder-doctor.png"}
              alt="Preview"
              fill
              priority
              sizes="128px"
              className="object-cover"
            />
            {preview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isLoading}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:pointer-events-none"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Upload button */}
          <div className="flex-1">
            <label
              className={`relative cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 transition-all group ${isLoading ? "opacity-50 pointer-events-none" : ""
                }`}
            >
              <Camera size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">
                {preview ? "Change Photo" : "Upload Photo"}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            {newFile && (
              <p className="text-[11px] text-teal-600 mt-2 ml-1 font-medium">
                ✓ New photo selected — will upload on save
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Uploading Photo…</span>
          </>
        ) : isPending ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Saving Changes…</span>
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}