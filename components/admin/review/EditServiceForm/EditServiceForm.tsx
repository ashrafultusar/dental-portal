"use client";

import { useState, useTransition, useRef } from "react";
import { updateServiceAction } from "@/actions/service";
import { Loader2, Camera, X, AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface IService {
  _id: string;
  title: string;
  description: string;
  price: string;
  icon?: string;
  image?: string;
  images?: string[];
}

interface EditServiceFormProps {
  service: IService;
}

// Upload a single file directly to Cloudinary from the client (bypasses Vercel body limit)
async function uploadToCloudinary(file: File): Promise<string> {
  // 1. Get a signed upload signature from our API
  const sigRes = await fetch("/api/upload/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "services" }),
  });
  if (!sigRes.ok) throw new Error("Failed to get upload signature");
  const { signature, timestamp, cloudName, apiKey, folder } =
    await sigRes.json();

  // 2. Upload directly to Cloudinary (no Vercel body size limit)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }
  const data = await uploadRes.json();
  return data.secure_url as string;
}

export default function EditServiceForm({ service }: EditServiceFormProps) {
  const router = useRouter();

  const initialImages = service.images?.length
    ? service.images
    : service.image
    ? [service.image]
    : [];

  const [existingImages, setExistingImages] = useState<string[]>(initialImages);
  // newFiles: files selected by user, not yet uploaded
  const [newFiles, setNewFiles] = useState<{ file: File; preview: string }[]>(
    []
  );

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = uploading || isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);

    const oversized = files.filter((f) => f.size > MAX_FILE_SIZE_BYTES);
    if (oversized.length > 0) {
      setUploadError(
        `${oversized
          .map((f) => f.name)
          .join(
            ", "
          )} exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose smaller images.`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewFiles((prev) => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveExisting = (idx: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveNew = (idx: number) => {
    setNewFiles((prev) =>
      prev.filter((item, i) => {
        if (i === idx) URL.revokeObjectURL(item.preview);
        return i !== idx;
      })
    );
  };

  const handleSubmit = async (formData: FormData) => {
    setUploadError(null);
    setUploading(true);

    try {
      // Upload all new files directly to Cloudinary from the browser
      const uploadedUrls: string[] = [];
      for (const { file } of newFiles) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }

      // Build the final image list: kept existing + newly uploaded
      const allImages = [...existingImages, ...uploadedUrls];

      // Pass only string URLs to the server action (no binary data)
      formData.delete("images");
      formData.delete("image");
      formData.delete("existingImages");
      allImages.forEach((url) => formData.append("allImages", url));

      setUploading(false);

      startTransition(async () => {
        const res = await updateServiceAction(service._id, formData);
        if (res?.error) {
          setUploadError(res.error);
        } else {
          setSuccess(true);
          // Force the Next.js router to refetch fresh data without a full page reload
          router.refresh();
        }
      });
    } catch (err) {
        setUploading(false);
        const errorMessage = err instanceof Error ? err.message : "Image upload failed. Please try again.";
        setUploadError(errorMessage);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto"
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
          <span>Service updated successfully! Redirecting…</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Service Title
          </label>
          <input
            name="title"
            defaultValue={service.title}
            type="text"
            required
            className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Price
          </label>
          <input
            name="price"
            defaultValue={service.price}
            type="text"
            required
            className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Icon Name
          </label>
          <input
            name="icon"
            defaultValue={service.icon}
            type="text"
            className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={service.description}
          rows={3}
          required
          className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
          Service Photos
        </label>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {/* Existing (already on Cloudinary) images */}
            {existingImages.map((img, idx) => (
              <div
                key={`existing-${idx}`}
                className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0 group"
              >
                <Image
                  src={img}
                  alt={`Image ${idx + 1}`}
                  fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExisting(idx)}
                  disabled={isLoading}
                 className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5 transition-all z-10 disabled:pointer-events-none"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Newly selected (local preview) images */}
            {newFiles.map((nf, idx) => (
              <div
                key={`new-${idx}`}
                className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-teal-200 shadow-md bg-slate-100 shrink-0 group"
              >
                <Image
                  src={nf.preview}
                  alt={`New ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-teal-500/10" />
                <button
                  type="button"
                  onClick={() => handleRemoveNew(idx)}
                  disabled={isLoading}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10 disabled:pointer-events-none"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full mt-2">
            <label
              className={`relative cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 transition-all group ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Camera
                size={24}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-base font-semibold">Add Photos</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            <p className="text-[12px] text-slate-500 mt-3 ml-2 font-medium">
              Square JPG or PNG recommended · Max {MAX_FILE_SIZE_MB}MB per image
              · Multiple files supported
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Uploading Images…</span>
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
