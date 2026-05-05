import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Node.js মডিউল
import User from "@/models/User"; // DB মডিউল
import { connectDB } from "@/db/dbConfig"; // DB মডিউল

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

        if (passwordsMatch) {
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});