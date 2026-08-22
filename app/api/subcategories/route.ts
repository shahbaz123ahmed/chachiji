import { NextResponse } from "next/server";
import { getSubCategories, addSubCategory, deleteSubCategory } from "@/lib/db";
import { SubCategoryInfo } from "@/types/ecommerce";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  let subcategories = getSubCategories();

  if (categoryId) {
    subcategories = subcategories.filter((s) => s.categoryId === categoryId);
  }

  return NextResponse.json({ success: true, subcategories });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: "Subcategory name and parent category are required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const highlights = Array.isArray(body.highlights)
      ? body.highlights
      : typeof body.highlights === "string" && body.highlights.trim()
      ? body.highlights.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const heroImages = Array.isArray(body.heroImages) && body.heroImages.length > 0
      ? body.heroImages
      : body.heroImage
      ? [body.heroImage]
      : [];

    const newSubCategory: SubCategoryInfo = {
      id: body.id || `sub_${Date.now()}`,
      categoryId: body.categoryId,
      name: body.name,
      slug,
      hindiName: body.hindiName || "",
      headline: body.headline || "",
      description: body.description || "",
      heroImage: heroImages[0] || body.heroImage || "",
      heroImages,
      imagePosition: body.imagePosition === "left" ? "left" : "right",
      textAlign: body.textAlign === "right" ? "right" : "left",
      highlights,
    };

    const saved = addSubCategory(newSubCategory);
    return NextResponse.json({ success: true, subcategory: saved });
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
        { success: false, error: "Subcategory ID is required for editing." },
        { status: 400 }
      );
    }

    const { updateSubCategory } = await import("@/lib/db");
    
    if (updatedFields.highlights && typeof updatedFields.highlights === "string") {
      updatedFields.highlights = updatedFields.highlights.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (updatedFields.heroImages && Array.isArray(updatedFields.heroImages)) {
      updatedFields.heroImage = updatedFields.heroImages[0] || updatedFields.heroImage || "";
    }

    const updated = updateSubCategory(id, updatedFields);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Subcategory not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, subcategory: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Subcategory ID is required." }, { status: 400 });
    }

    const deleted = deleteSubCategory(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
