import { NextResponse } from "next/server";
import { getHeroConfig, saveHeroConfig } from "@/lib/db";
import { HeroConfig } from "@/types/ecommerce";

export async function GET() {
  try {
    const heroConfig = getHeroConfig();
    return NextResponse.json({ success: true, heroConfig });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch hero config" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = saveHeroConfig(body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Failed to save hero config" },
        { status: 500 }
      );
    }

    const heroConfig = getHeroConfig();
    return NextResponse.json({ success: true, heroConfig });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update hero config" },
      { status: 500 }
    );
  }
}
