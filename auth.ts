import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { api } from "@/lib/api"
import { apiClient } from "@/lib/api-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        try {
          const authData = await api.auth.login({
            email: credentials.email as string,
            password: credentials.password as string,
          })
          
          if (authData && authData.access_token) {
            // Set token for the profile fetch
            apiClient.defaults.headers.common.Authorization = `Bearer ${authData.access_token}`
            
            const profile = await api.user.me()
            
            return {
              id: profile.id,
              email: profile.email,
              name: `${profile.prenom} ${profile.nom}`,
              role: profile.role,
              accessToken: authData.access_token,
            }
          }
          return null
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
