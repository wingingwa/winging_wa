"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, Star } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxFiles?: number;
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

export function MultiImageUploader({
  values = [],
  onChange,
  label = "Product Images",
  maxFiles = 10,
}: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList);
    const validFiles = rawFiles.filter((f) => f.type.startsWith("image/"));

    if (validFiles.length === 0) {
      setError("Please choose valid image files such as JPG, PNG, or WEBP.");
      return;
    }

    if (values.length + validFiles.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} images per product.`);
      return;
    }

    setError(null);
    setIsUploading(true);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadStatus(`Uploading image ${i + 1} of ${validFiles.length}...`);

        let fileToUpload = file;
        if (file.size > 1024 * 1024) {
          fileToUpload = await optimizeImage(file);
        }

        if (fileToUpload.size > MAX_UPLOAD_BYTES) {
          throw new Error(
            `File "${file.name}" is too large. Please select images under 4.5 MB.`
          );
        }

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
              `"${file.name}" is too large. Please select an image under 4.5 MB.`
            );
          }
          if (responseJson && responseJson.error) {
            throw new Error(responseJson.error);
          }
          throw new Error(
            `Unable to upload "${file.name}". Please check connection and try again.`
          );
        }

        if (responseJson && responseJson.url) {
          uploadedUrls.push(responseJson.url);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during upload. Please try again.");
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
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadFiles(e.target.files);
      e.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(values.filter((_, idx) => idx !== indexToRemove));
  };

  const makeCover = (indexToCover: number) => {
    if (indexToCover === 0) return;
    const item = values[indexToCover];
    const rest = values.filter((_, idx) => idx !== indexToCover);
    onChange([item, ...rest]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} ({values.length} added)
        </label>
        {values.length > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <CheckCircle2 className="size-3" />
            {values.length} Image{values.length > 1 ? "s" : ""} Ready
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
        className="hidden"
        onChange={onFileChange}
      />

      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative group rounded-xl border border-white/10 bg-[#2b2f38] p-2 overflow-hidden flex flex-col gap-2"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                <Image
                  src={url}
                  alt={`Product photo ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
                {idx === 0 ? (
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-[#ef0e0a] text-white text-[10px] font-bold px-2 py-0.5 shadow-sm">
                    Cover
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => makeCover(idx)}
                    className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/80 hover:bg-[#ef0e0a] text-white text-[10px] font-medium px-2 py-0.5 backdrop-blur-sm cursor-pointer inline-flex items-center gap-1"
                  >
                    <Star className="size-2.5" />
                    Set Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-black/80 hover:bg-red-600 text-white cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 truncate px-1 font-mono">
                {idx === 0 ? "★ Primary Photo" : `Image ${idx + 1}`}
              </p>
            </div>
          ))}

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square w-full rounded-xl border-2 border-dashed border-white/15 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white cursor-pointer p-3 text-center"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10">
              <Plus className="size-4 text-[#ef0e0a]" />
            </div>
            <span className="text-xs font-semibold">Add More</span>
            <span className="text-[10px] text-slate-500">Select files</span>
          </button>
        </div>
      )}

      {values.length === 0 && (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-[#ef0e0a] bg-[#ef0e0a]/10"
              : "border-white/15 bg-[#2b2f38]/60 hover:bg-[#2b2f38] hover:border-white/30"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="size-8 animate-spin text-[#ef0e0a]" />
              <p className="text-xs font-semibold text-white">
                {uploadStatus || "Uploading images..."}
              </p>
              <p className="text-[11px] text-slate-400">
                Large photos are automatically optimized
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <div className="p-3.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                <UploadCloud className="size-7 text-[#ef0e0a]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Drag and drop multiple equipment images here
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  or <span className="text-[#ef0e0a] underline">browse files</span> from your computer
                </p>
              </div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">
                Select 1 or more images (PNG, JPG, WEBP, AVIF up to 4.5MB each)
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
