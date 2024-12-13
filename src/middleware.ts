import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes (public-facing URLs)
const protectedRoutes = [
  "/admin/dashboard",
  "/admin/addPost",
  "/admin/managePost",
  "/admin/manageUser",
  "/admin/addUser",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is logged in by looking for the auth token in cookies
  const isLoggedIn = request.cookies.get("firebase-auth-token");

  // Redirect to login if the route is protected and the user is not logged in
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to continue for authenticated users
  return NextResponse.next();
}

// Apply middleware to specific routes using dynamic matching
export const config = {
  matcher: [
    "/admin/:path*", 
  ],
};
