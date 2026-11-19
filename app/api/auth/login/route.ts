import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const envEmail = process.env.ADMIN_EMAIL || "admin@wingingwa.com.au";
    const allowedEmails = Array.from(
      new Set([
        "admin@wingingwa.com.au",
        "wingingwa@gmail.com",
        ...envEmail.split(",").map((e) => e.trim().toLowerCase()),
      ])
    ).filter(Boolean);

    const expectedPassword = process.env.ADMIN_PASSWORD || "wi12345678";

    const normalizedEmail = (email || "").trim().toLowerCase();
    const isEmailValid = allowedEmails.includes(normalizedEmail);
    const isPasswordValid =
      password === expectedPassword || (password && password.trim() === expectedPassword);

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signAdminToken(normalizedEmail);

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        email: normalizedEmail,
        role: "admin",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
