import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    });

    const pathname = req.nextUrl.pathname;
    const isLoggedIn = !!token;

    const isAdminRoute = pathname.startsWith("/dental-staff-portal");

    if (isAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (token.role !== "admin" && token.role !== "moderator") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (isLoggedIn && pathname === "/login") {
        return NextResponse.redirect(new URL("/dental-staff-portal", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dental-staff-portal/:path*", "/login"],
};