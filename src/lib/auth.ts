import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import SalesforceProvider from "next-auth/providers/salesforce";
import { AuthOptions, Session } from "next-auth";

export const authOptions: AuthOptions = {
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
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

          const user = await res.json();
          console.log("User from backend:", user);

          if (res.ok && user) {
            return {
              id: user.id,
              email: user.email,
              firstName: user["First Name"],
              lastName: user["Last Name"],
              company: user["Company"],
              tenant_id: user["Tenant ID"], // Ensure tenant_id is mapped correctly
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
      // Add the user data (including tenant_id) to the token
      if (user) {
        token.user = user;
      }
      console.log("JWT Token:", token);  // Debugging step to check the token
      return token;
    },
    async session({ session, token }) {
      // Ensure that the tenant_id is available in the session
      if (token?.user) {
        session.user = token.user as Session["user"];
      }
      console.log("Session:", session);  // Debugging step to check the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
