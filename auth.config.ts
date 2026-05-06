import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = (user as User & { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as Session["user"] & { role: string }).role = token.role as string;
        (session.user as Session["user"] & { id: string }).id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as User & { role?: string })?.role;
      const { pathname } = nextUrl;

      const isOnDashboard = pathname.startsWith("/dental-staff-portal");
      const isLoginPage = pathname.startsWith("/login");

      if (isOnDashboard) {
        if (!isLoggedIn) return false;
        if (userRole === "admin" || userRole === "moderator") return true;
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/dental-staff-portal", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;