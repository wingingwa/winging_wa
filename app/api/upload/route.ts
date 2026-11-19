import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file was selected. Please choose an image file to upload." },
        { status: 400 }
      );
    }

    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "This image file is too large (over 4.5 MB). Please choose a smaller image." },
        { status: 413 }
      );
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniquePath = `equipment/${Date.now()}-${sanitizedName}`;

    const blob = await put(uniquePath, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Failed to upload image. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
