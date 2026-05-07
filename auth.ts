import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "@/lib/api";
import { apiClient } from "@/lib/api-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const authData = await api.auth.login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          console.log("AUTH DATA", authData);

          if (authData && authData.access_token) {
            // Set token for the profile fetch
            apiClient.defaults.headers.common.Authorization = `Bearer ${authData.access_token}`;

            const profile = await api.user.me();

            return {
              id: profile.id,
              email: profile.email,
              name: `${profile.prenom} ${profile.nom}`,
              role: profile.role,
              accessToken: authData.access_token,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
