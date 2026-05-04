import { apiClient } from "./api-client";
import {
  LoginRequest,
  LoginResponse,
  ChatRequest,
  ChatResponse,
  AgendaEvent,
  CreateEventRequest,
  UpdateEventRequest,
  ListEventsParams,
  UserMe,
} from "@/types/api";

export const api = {
  auth: {
    login: async (data: LoginRequest) => {
      const res = await apiClient.post<LoginResponse>("/auth/login", data);
      return res.data;
    },
  },
  agent: {
    getTools: async () => {
      const res = await apiClient.get("/agent/tools");
      return res.data;
    },
    chat: async (data: ChatRequest) => {
      const res = await apiClient.post<ChatResponse>("/agent/chat", data);
      return res.data;
    },
  },
  agenda: {
    list: async (params?: ListEventsParams) => {
      const res = await apiClient.get<AgendaEvent[]>("/agenda", { params });
      return res.data;
    },
    get: async (id: string) => {
      const res = await apiClient.get<AgendaEvent>(`/agenda/${id}`);
      return res.data;
    },
    create: async (data: CreateEventRequest) => {
      const res = await apiClient.post<AgendaEvent>("/agenda", data);
      return res.data;
    },
    update: async (id: string, data: UpdateEventRequest) => {
      const res = await apiClient.patch<AgendaEvent>(`/agenda/${id}`, data);
      return res.data;
    },
    delete: async (id: string) => {
      await apiClient.delete(`/agenda/${id}`);
    },
  },
  user: {
    me: async () => {
      const res = await apiClient.get<UserMe>("/user/me");
      return res.data;
    },
  },
};
