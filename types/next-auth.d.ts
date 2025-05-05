import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      company: string;
      tenant_id: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    tenant_id: number;
  }
}
