import axios from "axios"

const baseURL = "https://ai.test.manage.inov-consulting.com/"

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor to add the token to requests if it exists in localStorage or session
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})
