import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// NextAuth এর কনফিগারেশন দিয়ে একটি ইন্সট্যান্স তৈরি করো
const { auth } = NextAuth(authConfig);

// এটিই এক্সপোর্ট করো
export default auth;

export const config = {
  // আগের মতোই সব পাবলিক ফাইল এবং API রাউট ইগনোর করবে
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};