import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // Using getToken completely bypasses the NextAuth core `openid-client` Edge/Turbopack bug!
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    });

    const pathname = req.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith("/dental-staff-portal");

    if (isAdminRoute) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        // @ts-ignore
        if (token.role !== "admin") {
            return NextResponse.redirect(new URL("/404-not-found", req.url));
        }
    }

    if (token) {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/dental-staff-portal", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
