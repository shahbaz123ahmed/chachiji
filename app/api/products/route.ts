import { NextResponse } from "next/server";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/db";
import { Product } from "@/types/ecommerce";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const search = searchParams.get("search");

  let products = getProducts();

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (subCategory) {
    products = products.filter((p) => p.subCategory === subCategory);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.hindiName?.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, products });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { success: false, error: "Product name, category, and price are required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const newProduct: Product = {
      id: body.id || `prod_${Date.now()}`,
      slug,
      name: body.name,
      hindiName: body.hindiName || "",
      category: body.category,
      subCategory: body.subCategory || "",
      tagline: body.tagline || "",
      shortDescription: body.shortDescription || body.description || "",
      description: body.description || "",
      price: Number(body.price),
      mrp: Number(body.mrp || body.price),
      discountPercentage: body.mrp && body.mrp > body.price
        ? Math.round(((body.mrp - body.price) / body.mrp) * 100)
        : 0,
      weight: body.weight || "400g",
      rating: Number(body.rating || 5.0),
      reviewCount: Number(body.reviewCount || 1),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.image || "/slide1.png"],
      variants: Array.isArray(body.variants) && body.variants.length > 0
        ? body.variants
        : [
            {
              id: "v1",
              weight: body.weight || "400g",
              price: Number(body.price),
              mrp: Number(body.mrp || body.price),
              inStock: body.inStock !== false,
            },
          ],
      badges: Array.isArray(body.badges) ? body.badges : (body.badge ? [body.badge] : []),
      isBestseller: Boolean(body.isBestseller),
      isFeatured: Boolean(body.isFeatured),
      isNew: Boolean(body.isNew),
      inStock: body.inStock !== false,
      stockCount: Number(body.stockCount || 50),
      ingredients: Array.isArray(body.ingredients)
        ? body.ingredients
        : body.ingredients ? body.ingredients.split(",").map((s: string) => s.trim()) : [],
      spiceLevel: body.spiceLevel || "Medium",
      shelfLife: body.shelfLife || "12 Months from MFD",
      oilUsed: body.oilUsed || "",
      curingProcess: body.curingProcess || "",
      harvestOrigin: body.harvestOrigin || "",
      nutritionPer100g: body.nutritionPer100g || {
        energyKcal: 350,
        proteinG: 9.7,
        carbsG: 76.9,
        fatG: 0.1,
        sodiumMg: 3,
      },
      pairings: Array.isArray(body.pairings) ? body.pairings : [],
      storageInstructions: body.storageInstructions || "Store in a cool, dry place.",
      whyYouWillLoveIt: Array.isArray(body.whyYouWillLoveIt) ? body.whyYouWillLoveIt : [],
      faqs: Array.isArray(body.faqs) ? body.faqs : [],
    };

    const saved = addProduct(newProduct);
    return NextResponse.json({ success: true, product: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Product ID is required." }, { status: 400 });
    }

    if (body.weight && (!body.variants || body.variants.length === 0)) {
      body.variants = [
        {
          id: "v1",
          weight: body.weight,
          price: Number(body.price),
          mrp: Number(body.mrp || body.price),
          inStock: true,
        },
      ];
    } else if (body.weight && Array.isArray(body.variants) && body.variants.length > 0) {
      body.variants[0].weight = body.weight;
    }

    const updated = updateProduct(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required." }, { status: 400 });
    }

    const deleted = deleteProduct(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
