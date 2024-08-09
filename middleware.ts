"use server";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/auth/signin", "/auth/signup"];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!sessionToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/tasks",
    "/tasks/:taskId",
    "/auth/signin",
    "/auth/signup",
  ],
};
