import { prisma } from "@repo/database";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email || !account?.userId) {
        return false;
      }
      const user = await prisma.user.upsert({
        where: {
          email: profile.email,
          googleId: account.userId,
        },
        create: {
          email: profile.email,
          name: profile.name,
          googleId: account.userId,
        },
        update: {
          name: profile.name,
        },
      });

      if (user) {
        return true;
      }
      return false;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
};
