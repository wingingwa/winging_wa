import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET || "wingingwa_super_secret_admin_key_2026_jwt";
  return new TextEncoder().encode(secret);
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("admin_token")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, getJwtSecret());
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isDashboardApiRoute = pathname.startsWith("/api/dashboard");
  const isUploadApiRoute = pathname.startsWith("/api/upload");
  const isProtectedApiMutation =
    (pathname.startsWith("/api/equipment") && request.method !== "GET") ||
    (pathname.startsWith("/api/youtube-links") && request.method !== "GET") ||
    (pathname.startsWith("/api/contacts") && request.method !== "POST");

  if (isDashboardRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      if (token) response.cookies.delete("admin_token");
      return response;
    }
    return NextResponse.next();
  }

  if (isDashboardApiRoute || isUploadApiRoute || isProtectedApiMutation) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/api/upload/:path*",
    "/api/equipment/:path*",
    "/api/youtube-links/:path*",
    "/api/contacts/:path*",
  ],
};

