import axios from "axios"
import { getSession } from "next-auth/react"

export const API_BASE_URL = "https://ai.test.manage.inov-consulting.com/"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor to add the token to requests
apiClient.interceptors.request.use(async (config) => {
  let token: string | null = null

  if (typeof window !== "undefined") {
    // 1. Try localStorage
    token = localStorage.getItem("token")
    
    // 2. Try session if no localStorage token
    if (!token) {
      const session = await getSession()
      if (session && "accessToken" in session) {
        token = session.accessToken as string
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
