import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "shahbaz126ahmed@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Chachiji@123";
const AUTH_COOKIE_NAME = "chachiji_admin_session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (session && session.value === "authenticated_admin") {
    return NextResponse.json({
      authenticated: true,
      user: { email: ADMIN_EMAIL, role: "Super Admin" },
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const inputEmail = email.trim().toLowerCase();
    const isAllowedEmail =
      inputEmail === ADMIN_EMAIL.toLowerCase() ||
      inputEmail === "chachiji@gmail.com" ||
      inputEmail === "shahbaz126ahmed@gmail" ||
      inputEmail === "shahbaz126ahmed@gmail.com";

    if (isAllowedEmail && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, "authenticated_admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Logged in successfully!",
        user: { email: ADMIN_EMAIL, role: "Super Admin" },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid email or password. Please try again." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Authentication error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
