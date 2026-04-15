import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // ১ সপ্তাহ লগইন থাকবে
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const { pathname } = nextUrl;

      const isOnDashboard = pathname.startsWith("/dental-staff-portal");
      const isLoginPage = pathname.startsWith("/login");
      const isRegisterPage = pathname.startsWith("/register");

      // ১. ড্যাশবোর্ড প্রোটেকশন
      if (isOnDashboard) {
        if (!isLoggedIn) return false; // লগইন না থাকলে /login এ পাঠাবে
        if (userRole === "admin" || userRole === "moderator") {
          return true;
        }
        return Response.redirect(new URL("/404-not-found", nextUrl));
      }

      // ২. লগইন থাকা অবস্থায় পেজ এক্সেস লজিক
      if (isLoggedIn) {
        // লগইন থাকলে /login পেজে যেতে দিবে না, ড্যাশবোর্ডে পাঠিয়ে দিবে
        if (isLoginPage) {
          return Response.redirect(new URL("/dental-staff-portal", nextUrl));
        }
        
        // লগইন থাকা অবস্থায় /register পেজে যাওয়ার অনুমতি দেওয়া হলো (অ্যাডমিনের জন্য)
        if (isRegisterPage) {
          return true;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;