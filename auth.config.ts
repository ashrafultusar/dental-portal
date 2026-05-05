import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // এখানে কিছুই লাগবে না
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
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