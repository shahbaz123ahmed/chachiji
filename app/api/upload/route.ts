import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. If Cloudinary credentials are set in .env / Vercel, upload directly to Cloudinary CDN
    if (isCloudinaryConfigured) {
      try {
        const cloudinaryResult = await uploadToCloudinary(buffer, "chachiji_store");
        return NextResponse.json({
          success: true,
          url: cloudinaryResult.url,
          public_id: cloudinaryResult.public_id,
          provider: "cloudinary",
        });
      } catch (cloudinaryError: any) {
        console.error("Cloudinary upload failed, falling back to local:", cloudinaryError);
        // Fallback to local storage if Cloudinary fails
      }
    }

    // 2. Fallback / Local development storage
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;

    const uploadDirs = [
      path.join(process.cwd(), "public", "uploads"),
      path.join("C:\\Users\\aman\\Downloads\\chachi", "public", "uploads"),
      path.join("C:\\Users\\aman\\Desktop\\chachi", "public", "uploads"),
    ];

    uploadDirs.forEach((dir) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, uniqueFileName);
        fs.writeFileSync(filePath, buffer);
      } catch (err) {
        // Skip inaccessible dirs
      }
    });

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      provider: "local",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
