import { apiClient } from "./api-client";

export interface MessageResponse {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  session_id: string;
  response: string;
  tool_used: string | null;
  turn: number;
}

export interface Tool {
  name: string;
  description: string;
  args_schema: Record<string, unknown>;
}

export const chatService = {
  getHistory: async (sessionId: string) => {
    const response = await apiClient.get<MessageResponse[]>(`/session/${sessionId}/history`);
    return response.data;
  },

  sendMessage: async (message: string, sessionId?: string) => {
    const response = await apiClient.post<ChatResponse>("/agent/chat", {
      session_id: sessionId,
      message,
    });
    return response.data;
  },

  getTools: async () => {
    const response = await apiClient.get<Tool[]>("/agent/tools");
    return response.data;
  },
};
