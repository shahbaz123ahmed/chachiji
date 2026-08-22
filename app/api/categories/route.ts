import { NextResponse } from "next/server";
import { getCategories, addCategory, deleteCategory } from "@/lib/db";
import { CategoryInfo } from "@/types/ecommerce";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const newCategory: CategoryInfo = {
      id: body.id || slug,
      slug,
      name: body.name,
      hindiName: body.hindiName || "",
      headline: body.headline || `${body.name} Collections`,
      tagline: body.tagline || "Authentic & Handcrafted.",
      description: body.description || "",
      heroImage: Array.isArray(body.heroImages) && body.heroImages.length > 0 ? body.heroImages[0] : (body.heroImage || "/makh1-clean.png"),
      heroImages: Array.isArray(body.heroImages) && body.heroImages.length > 0 ? body.heroImages : (body.heroImage ? [body.heroImage] : ["/makh1-clean.png"]),
      imagePosition: body.imagePosition || "right",
      textAlign: body.textAlign || "left",
      hideText: Boolean(body.hideText),
      seoTitle: body.seoTitle || `${body.name} Online - Chachiji`,
      seoDescription: body.seoDescription || `Buy authentic ${body.name} online from Chachiji.`,
      highlights: Array.isArray(body.highlights)
        ? body.highlights
        : body.highlights ? body.highlights.split(",").map((s: string) => s.trim()) : [],
    };

    const saved = addCategory(newCategory);
    return NextResponse.json({ success: true, category: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required for editing." },
        { status: 400 }
      );
    }

    if (Array.isArray(updatedFields.heroImages) && updatedFields.heroImages.length > 0) {
      updatedFields.heroImage = updatedFields.heroImages[0];
    } else if (updatedFields.heroImage && (!updatedFields.heroImages || updatedFields.heroImages.length === 0)) {
      updatedFields.heroImages = [updatedFields.heroImage];
    }

    if (updatedFields.highlights && typeof updatedFields.highlights === "string") {
      updatedFields.highlights = updatedFields.highlights
        .split(",")
        .map((s: string) => s.trim());
    }

    const { updateCategory } = await import("@/lib/db");
    const updated = updateCategory(id, updatedFields);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID is required." }, { status: 400 });
    }

    const deleted = deleteCategory(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
