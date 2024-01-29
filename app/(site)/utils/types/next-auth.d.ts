import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      Name: string;
      accessToken: string;
      username: string;
      jti: string;
      exp: number;
      iat: number;
      schoolId: string;
    };
  }
}
