"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Product Image",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, SVG)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload to Vercel Blob");
      }

      onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
        {value && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <CheckCircle2 className="size-3" />
            Vercel Blob Hosted
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      {value ? (
        <div className="relative group rounded-xl border border-white/10 bg-[#2b2f38] p-3 overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="relative size-20 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
              <Image
                src={value}
                alt="Product preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Ready for publication</p>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-[#ef0e0a] hover:underline cursor-pointer"
                >
                  Replace Image
                </button>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="text-xs font-semibold text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
              title="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-[#ef0e0a] bg-[#ef0e0a]/10"
              : "border-white/15 bg-[#2b2f38]/60 hover:bg-[#2b2f38] hover:border-white/30"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="size-8 animate-spin text-[#ef0e0a]" />
              <p className="text-xs font-semibold text-white">Uploading to Vercel Blob...</p>
              <p className="text-[11px] text-slate-400">Processing high-speed CDN asset</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300">
                <UploadCloud className="size-6 text-[#ef0e0a]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Drag and drop your equipment image here
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  or <span className="text-[#ef0e0a] underline">browse files</span> from your computer
                </p>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                PNG, JPG, WEBP, SVG up to 10MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 animate-in fade-in duration-200">{error}</p>
      )}
    </div>
  );
}

