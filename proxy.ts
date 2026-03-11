import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./app/lib/getUserSession";

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
  const session = await getUserSession();
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!session && PROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && session && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/terms",
    "/privacy",
    "/",
    "/forgot-password",
    "/dashboard",
    "/accounts",
    "/transactions",
    "/settings",
    "/analytics",
    "/budgets",
    "/upgrade",
  ],
};
