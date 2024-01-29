import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

interface ICredentials {
  email?: string | undefined;
  password?: string | undefined;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as ICredentials;
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "applicatin/json" },
          body: JSON.stringify({ email, password }),
        });

        const user = await response.json();
        if (response.ok && user) {
          return {
            ...user,
            accessToken: response.headers.get("authorization"),
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    redirect: async ({ url, baseUrl }: any) => {
      return Promise.resolve(url);
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
