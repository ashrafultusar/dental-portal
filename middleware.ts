import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// এটি শুধুমাত্র কনফিগারেশন ব্যবহার করবে, ভারী ডাটাবেস কোড নয়
export const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};