import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import SalesforceProvider from "next-auth/providers/salesforce"
import { Session, User } from "next-auth";

const handler = NextAuth({
  debug:true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    SalesforceProvider({
      clientId: process.env.SALESFORCE_CLIENT_ID!,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("✅ NextAuth config loaded");
          const res = await fetch(process.env.BACKEND_URL!, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          console.log(process.env.BACKEND_URL);
          const user = await res.json();
          console.log("User from backend:", user);

          if (res.ok && user) {
            return {
              id: user.id,
              email: user.email,
              firstName: user["First Name"],
              lastName: user["Last Name"],
              company: user["Company"],
              tenant_id: user["Tenant ID"],
            }; 
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      console.log("JWT Token:", token); // Log to verify tenant_id is included
      return token;
    },    
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as Session["user"];
      }
      console.log("Session:", session); // Log to verify tenant_id is included in the session
      return session;
    }
  },
})

export { handler as GET, handler as POST }
