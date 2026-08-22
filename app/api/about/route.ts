import { NextResponse } from "next/server";
import { getAboutConfig, saveAboutConfig } from "@/lib/db";
import { AboutConfig } from "@/types/ecommerce";

export async function GET() {
  try {
    const aboutConfig = getAboutConfig();
    return NextResponse.json({ success: true, aboutConfig });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch about config" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = saveAboutConfig(body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Failed to save about config" },
        { status: 500 }
      );
    }

    const aboutConfig = getAboutConfig();
    return NextResponse.json({ success: true, aboutConfig });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update about config" },
      { status: 500 }
    );
  }
}
