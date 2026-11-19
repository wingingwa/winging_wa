"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;

async function optimizeImage(file: File): Promise<File> {
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  if (typeof window === "undefined" || !window.createImageBitmap) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 2000;
    let { width, height } = bitmap;

    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);

    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const quality = 0.85;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, outputType, quality);
    });

    if (blob && blob.size < file.size) {
      const ext = outputType === "image/png" ? ".png" : ".jpg";
      const newName = file.name.replace(/\.[^.]+$/, ext);
      return new File([blob], newName, { type: outputType });
    }

    return file;
  } catch {
    return file;
  }
}

export function ImageUploader({
  value,
  onChange,
  label = "Product Image",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose a valid image file such as JPG, PNG, or WEBP.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadStatus("Optimizing image for fast loading...");

    try {
      let fileToUpload = selectedFile;
      if (selectedFile.size > 1024 * 1024) {
        fileToUpload = await optimizeImage(selectedFile);
      }

      if (fileToUpload.size > MAX_UPLOAD_BYTES) {
        throw new Error(
          "This image file is too large to upload. Please choose an image smaller than 4.5 MB."
        );
      }

      setUploadStatus("Uploading to cloud storage...");

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text();
      let responseJson: { url?: string; error?: string } | null = null;

      try {
        responseJson = JSON.parse(responseText);
      } catch {
        responseJson = null;
      }

      if (!res.ok) {
        if (
          res.status === 413 ||
          responseText.toLowerCase().includes("request entity") ||
          responseText.includes("FUNCTION_PAYLOAD_TOO_LARGE")
        ) {
          throw new Error(
            "This image is too large. Please select an image under 4.5 MB."
          );
        }

        if (responseJson && responseJson.error) {
          throw new Error(responseJson.error);
        }

        throw new Error(
          "Unable to upload image right now. Please check your connection and try again."
        );
      }

      if (!responseJson || !responseJson.url) {
        throw new Error("Upload completed, but no image link was returned.");
      }

      onChange(responseJson.url);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to upload image right now. Please try again.");
      }
    } finally {
      setIsUploading(false);
      setUploadStatus(null);
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
            Image Ready
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
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
              <p className="text-xs font-semibold text-white">
                {uploadStatus || "Uploading image..."}
              </p>
              <p className="text-[11px] text-slate-400">
                Large photos are automatically optimized
              </p>
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
                PNG, JPG, WEBP, SVG up to 4.5MB (larger photos auto-optimized)
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-300 animate-in fade-in duration-200">
          <AlertCircle className="size-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
