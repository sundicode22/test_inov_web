"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { ChatHeader } from "@/components/dashboard/conversations/chat-header";
import {
  MessageAI,
  MessageUser,
} from "@/components/dashboard/conversations/chat-message";
import { ChatInput } from "@/components/dashboard/conversations/chat-input";
import { useChatHistory, useSendMessage } from "@/hooks/use-chat";
import { useSession } from "next-auth/react";
type Message = {
  id: string | number;
  type: "ai" | "user";
  content: string | React.ReactNode;
  timestamp: string;
};

function createWelcomeMessage(): Message {
  return {
    id: "welcome",
    type: "ai",
    content: (
      <>
        👋 <span className="font-bold">Bonjour !</span>
        <br />
        Je suis votre assistant intelligent. Comment puis-je vous aider
        aujourd&apos;hui ?
      </>
    ),
    timestamp: new Date().toISOString(),
  };
}

export default function ConversationsPage() {
  const queryClient = useQueryClient();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat_session_id");
    }
    return null;
  });

  const [localMessages, setLocalMessages] = useState<Message[]>(() => [
    createWelcomeMessage(),
  ]);

  const { data: history, isLoading: isLoadingHistory } =
    useChatHistory(sessionId);
  const sendMessageMutation = useSendMessage();

  const handleNewConversation = useCallback(() => {
    localStorage.removeItem("chat_session_id");
    setSessionId(null);
    queryClient.removeQueries({ queryKey: ["chat-history"] });
    sendMessageMutation.reset();
    setLocalMessages([createWelcomeMessage()]);
    toast.success("Nouvelle conversation démarrée");
  }, [queryClient, sendMessageMutation]);

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;
    root.scrollTo({ top: root.scrollHeight, behavior: "smooth" });
  }, [history, localMessages]);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now(),
      type: "user",
      content: content,
      timestamp: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, userMsg]);

    sendMessageMutation.mutate(
      { message: content, sessionId: sessionId || undefined },
      {
        onSuccess: (data) => {
          if (!sessionId && data.session_id) {
            setSessionId(data.session_id);
            localStorage.setItem("chat_session_id", data.session_id);
          }

          const aiMsg: Message = {
            id: Date.now() + 1,
            type: "ai",
            content: data.response,
            timestamp: new Date().toISOString(),
          };
          setLocalMessages((prev) => [...prev, aiMsg]);
        },
        onError: () => {
          toast.error("Erreur lors de l'envoi du message");
        },
      },
    );
  };

  // Combine history and local messages
  const allMessages = useMemo(() => {
    if (!history) return localMessages;

    // Filter out local messages that are already in history
    const historyMessages: Message[] = history.map((msg, i) => ({
      id: `hist-${i}`,
      type: (msg.role === "assistant" ? "ai" : "user") as "ai" | "user",
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    // Separate welcome message from other local messages
    const welcomeMsg = localMessages.find((m) => m.id === "welcome");
    const otherLocalMessages = localMessages.filter(
      (m) =>
        m.id !== "welcome" &&
        !history.some(
          (h) =>
            h.content === m.content &&
            h.role === (m.type === "ai" ? "assistant" : "user"),
        ),
    );

    return [
      ...(welcomeMsg ? [welcomeMsg] : []),
      ...historyMessages,
      ...otherLocalMessages,
    ];
  }, [history, localMessages]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50/50">
      <ChatHeader onNewConversation={handleNewConversation} />

      <div
        ref={scrollContainerRef}
        className="chat-messages-scroll min-h-0 flex-1 space-y-8 overflow-y-auto p-4 lg:px-32"
      >
        {isLoadingHistory && sessionId && (
          <div className="flex justify-center p-4">
            <span className="text-sm text-slate-400 font-medium animate-pulse">
              Chargement de l&apos;historique...
            </span>
          </div>
        )}

        {allMessages.map((msg) =>
          msg.type === "ai" ? (
            <MessageAI key={msg.id} timestamp={msg.timestamp}>
              {msg.content}
            </MessageAI>
          ) : (
            <MessageUser
              user={session?.user?.name ?? ""}
              key={msg.id}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ),
        )}

        {/* Typing Indicator */}
        {sendMessageMutation.isPending && (
          <div className="flex gap-4">
            <div className="size-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="p-4 bg-white rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1">
              <div className="size-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]" />
              <div className="size-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]" />
              <div className="size-1.5 rounded-full bg-slate-300 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={scrollBottomRef} className="h-4" />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
}
