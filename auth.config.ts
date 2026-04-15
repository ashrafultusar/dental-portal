import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      
      const userRole = auth?.user?.role;

      const isOnDashboard = nextUrl.pathname.startsWith("/dental-staff-portal");
      const isOnAdmin = nextUrl.pathname.startsWith("/dental-staff-portal");

      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (userRole === "admin" || userRole === "moderator") {
          return true;
        }
        return Response.redirect(new URL("/404-not-found", nextUrl));
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (
          nextUrl.pathname.startsWith("/login") ||
          nextUrl.pathname.startsWith("/register")
        ) {
          return Response.redirect(new URL("/dental-staff-portal", nextUrl));
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
