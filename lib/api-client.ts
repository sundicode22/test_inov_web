import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token to requests
apiClient.interceptors.request.use(async (config) => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    // 1. Try localStorage
    token = localStorage.getItem("token");

    // 2. Try session if no localStorage token
    if (!token) {
      const session = await getSession();
      if (session && "accessToken" in session) {
        token = session.accessToken as string;
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("RESPONSE", response);
    if (response.status === 401) {
      signOut();
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
