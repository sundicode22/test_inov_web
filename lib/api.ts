import { apiClient } from "./api-client"
import { 
  LoginRequest, 
  LoginResponse, 
  ChatRequest, 
  ChatResponse, 
  AgendaEvent, 
  CreateEventRequest, 
  ListEventsParams,
  UserMe
} from "@/types/api"

export const api = {
  auth: {
    login: (data: LoginRequest) => 
      apiClient.post<LoginResponse>("/auth/Login", data).then(res => res.data),
  },
  agent: {
    getTools: () => 
      apiClient.get("/agent/tools").then(res => res.data),
    chat: (data: ChatRequest) => 
      apiClient.post<ChatResponse>("/agent/chat", data).then(res => res.data),
  },
  agenda: {
    list: (params?: ListEventsParams) => 
      apiClient.get<AgendaEvent[]>("/agenda", { params }).then(res => res.data),
    create: (data: CreateEventRequest) => 
      apiClient.post<AgendaEvent>("/agenda", data).then(res => res.data),
  },
  user: {
    me: () => 
      apiClient.get<UserMe>("/user/me").then(res => res.data),
  },
}
