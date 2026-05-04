"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mic, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useRef, useEffect, useCallback } from "react";
import { MentionMenu } from "./mention-menu";
import { AgentTool } from "@/types/api";
import {
  ChatAttachmentPicker,
  type AttachmentSource,
} from "./chat-attachment-picker";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";

const chatSchema = z.object({
  message: z.string().max(2000, "Message trop long"),
});

type ChatFormValues = z.infer<typeof chatSchema>;

type PendingAttachment = {
  id: string;
  file: File;
  source: AttachmentSource;
  previewUrl?: string;
};

function buildOutgoingText(message: string, attachments: PendingAttachment[]): string {
  const parts: string[] = [];
  const trimmed = message.trim();
  if (trimmed) parts.push(trimmed);
  if (attachments.length) {
    const list = attachments
      .map((a) => `${a.file.name} (${labelSource(a.source)})`)
      .join(" · ");
    parts.push(`📎 Pièces jointes : ${list}`);
  }
  return parts.join("\n\n");
}

function labelSource(s: AttachmentSource) {
  if (s === "image") return "image";
  if (s === "video") return "vidéo";
  return "photo";
}

export const ChatInput = ({
  onSendMessage,
  disabled,
}: {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}) => {
  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: "" },
  });

  const [mentionSearch, setMentionSearch] = useState<string | null>(null);
  const [mentionStart, setMentionStart] = useState<number>(-1);
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    isRecording,
    durationMs,
    error: micError,
    start: startRecording,
    stop: stopRecording,
  } = useVoiceRecorder();

  useEffect(() => {
    if (micError) toast.error(micError);
  }, [micError]);

  useEffect(() => {
    return () => {
      attachments.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
    };
  }, [attachments]);

  const { data: tools = [] } = useQuery({
    queryKey: ["agent-tools"],
    queryFn: () => api.agent.getTools(),
  });

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const pos = target.selectionStart;

    const lastAt = value.lastIndexOf("@", pos - 1);
    if (lastAt !== -1) {
      const charBeforeAt = lastAt === 0 ? "" : value[lastAt - 1];
      if (charBeforeAt === "" || charBeforeAt === " " || charBeforeAt === "\n") {
        const query = value.substring(lastAt + 1, pos);
        if (!query.includes(" ")) {
          setMentionSearch(query);
          setMentionStart(lastAt);
          return;
        }
      }
    }
    setMentionSearch(null);
    setMentionStart(-1);
  };

  const handleSelectTool = (tool: AgentTool) => {
    if (mentionStart === -1) return;

    const value = form.getValues("message");
    const before = value.substring(0, mentionStart);
    const after = value.substring(textareaRef.current?.selectionStart || 0);

    const newMessage = `${before}@${tool.name} ${after}`;
    form.setValue("message", newMessage);

    setMentionSearch(null);
    setMentionStart(-1);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = before.length + tool.name.length + 2;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const addFiles = useCallback((files: File[], source: AttachmentSource) => {
    setAttachments((prev) => {
      const next: PendingAttachment[] = [...prev];
      for (const file of files) {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        let previewUrl: string | undefined;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
        }
        next.push({ id, file, source, previewUrl });
      }
      return next;
    });
    toast.success(
      files.length > 1 ? `${files.length} fichiers ajoutés` : "Fichier ajouté",
    );
  }, []);

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const found = prev.find((a) => a.id === id);
      if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  };

  const handleMicClick = async () => {
    if (disabled) return;
    if (isRecording) {
      const result = await stopRecording();
      if (result && result.durationMs >= 400) {
        const sec = Math.max(1, Math.round(result.durationMs / 1000));
        const line = `🎤 Note vocale · ${sec}s`;
        const cur = form.getValues("message");
        form.setValue("message", cur.trim() ? `${cur.trim()}\n\n${line}` : line);
        toast.success("Note vocale ajoutée au message");
      } else if (result) {
        toast.message("Enregistrement trop court");
      }
      return;
    }
    await startRecording();
  };

  async function onSubmit(values: ChatFormValues) {
    const trimmed = values.message.trim();
    if (!trimmed && attachments.length === 0) {
      toast.error("Écrivez un message ou ajoutez un fichier.");
      return;
    }

    const payload = buildOutgoingText(trimmed, attachments);
    onSendMessage(payload);
    form.reset({ message: "" });
    attachments.forEach((a) => {
      if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
    });
    setAttachments([]);
  }

  const messageValue = form.watch("message");
  const canSend =
    (messageValue?.trim().length ?? 0) > 0 || attachments.length > 0;

  const busy = Boolean(disabled);

  return (
    <div className="relative z-10 w-full shrink-0 border-t bg-white px-4 py-4 lg:px-32">
      <div className="mx-auto flex w-full max-w-4xl items-end gap-3">
        <div className="flex-1 rounded-xl border border-transparent bg-background p-2 transition-all focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 px-2 pt-1">
                  {attachments.map((a) => (
                    <div
                      key={a.id}
                      className="group relative flex max-w-[200px] items-center gap-2 rounded-lg border border-slate-200 bg-white py-1 pl-1 pr-7 text-xs shadow-sm"
                    >
                      {a.previewUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={a.previewUrl}
                          alt=""
                          className="size-9 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex size-9 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-500">
                          {a.file.name.split(".").pop()?.slice(0, 4) ?? "FILE"}
                        </div>
                      )}
                      <span className="min-w-0 flex-1 truncate font-medium text-slate-700">
                        {a.file.name}
                      </span>
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        onClick={() => removeAttachment(a.id)}
                        aria-label="Retirer la pièce jointe"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="relative">
                    {mentionSearch !== null && (
                      <MentionMenu
                        tools={tools}
                        search={mentionSearch}
                        onSelect={handleSelectTool}
                        onClose={() => setMentionSearch(null)}
                      />
                    )}
                    <FormControl>
                      <textarea
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          textareaRef.current = e;
                        }}
                        disabled={busy}
                        placeholder="Posez votre question ou décrivez ce dont vous avez besoin..."
                        rows={1}
                        className="w-full min-h-[55px] resize-none border-none bg-transparent p-4 text-sm font-medium text-foreground outline-none placeholder:text-slate-400 focus:ring-0"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                          handleInput(e);
                        }}
                        onKeyDown={(e) => {
                          if (mentionSearch !== null) {
                            const navigationKeys = [
                              "ArrowDown",
                              "ArrowUp",
                              "Enter",
                              "Tab",
                              "Escape",
                            ];
                            if (navigationKeys.includes(e.key)) {
                              e.preventDefault();
                              return;
                            }
                          }

                          if (
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            mentionSearch === null
                          ) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-0.5">
                  <ChatAttachmentPicker onFiles={addFiles} disabled={busy} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={busy}
                    onClick={handleMicClick}
                    className={`size-9 rounded-xl hover:bg-white/50 ${
                      isRecording
                        ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                    aria-label={
                      isRecording ? "Arrêter l'enregistrement" : "Enregistrer une note vocale"
                    }
                  >
                    <Mic className={`size-5 ${isRecording ? "animate-pulse" : ""}`} />
                  </Button>
                  {isRecording && (
                    <span className="text-xs font-semibold tabular-nums text-red-600">
                      {(durationMs / 1000).toFixed(1)}s
                    </span>
                  )}
                </div>
                <span className="px-2 text-[11px] font-bold text-slate-400">
                  {messageValue?.length || 0} / 2000
                </span>
              </div>
            </form>
          </Form>
        </div>
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={busy || !canSend}
          className="flex size-[56px] shrink-0 items-center justify-center rounded-[20px] bg-blue-600 p-0 shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:shadow-none"
        >
          {disabled ? (
            <Loader2 className="size-6 animate-spin text-white" />
          ) : (
            <Send className="size-6 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};
