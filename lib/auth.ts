import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const getJwtSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET || "wingingwa_super_secret_admin_key_2026_jwt";
  return new TextEncoder().encode(secret);
};

export async function signAdminToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

