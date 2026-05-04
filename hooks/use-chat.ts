import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatService } from "@/lib/chat-service";

export const useChatHistory = (sessionId: string | null) => {
  return useQuery({
    queryKey: ["chat-history", sessionId],
    queryFn: () => chatService.getHistory(sessionId!),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ message, sessionId }: { message: string; sessionId?: string }) =>
      chatService.sendMessage(message, sessionId),
    onSuccess: (data) => {
      // Invalidate history to refetch or manually update cache
      queryClient.invalidateQueries({ queryKey: ["chat-history", data.session_id] });
    },
  });
};
