import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GUEST_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/profile", "/feed"];

export function middleware(request: NextRequest) {
    const user = request.cookies.get("auth-token");
    const currentPath = request.nextUrl.pathname;

    if (!user && PROTECTED_ROUTES.includes(currentPath)) {
        
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user && GUEST_ROUTES.includes(currentPath)) {
       
        return NextResponse.redirect(new URL("/feed", request.url));
    }

    // Allow all other requests
    return NextResponse.next();
}
