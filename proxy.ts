import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/terms",
  "/privacy",
  "/",
  "/forgot-password",
];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/accounts",
  "/transactions",
  "/settings",
  "/analytics",
  "/budgets",
  "/upgrade",
];

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // unauthenticated user trying to access protected route
  if (
    !token &&
    PROTECTED_ROUTES.some(
      (route) => route === pathname || pathname.startsWith(`${route}/`),
    )
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // authenticated user trying to access public route
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // unauthenticated API call
  if (
    !token &&
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
