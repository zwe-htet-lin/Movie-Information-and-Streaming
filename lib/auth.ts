import { config } from "@/lib/config";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  callbacks: {
    async redirect() {
      return "/";
    },
  },
};
