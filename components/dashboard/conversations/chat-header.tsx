"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatHeaderProps = {
  onNewConversation?: () => void;
};

export const ChatHeader = ({ onNewConversation }: ChatHeaderProps) => (
  <div className="flex shrink-0 z-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-md supports-backdrop-filter:bg-white/90 lg:px-8">
    <div className="flex items-center gap-4">
      <div className="relative group cursor-pointer">
        <div className="size-12 rounded-[1.25rem] bg-gradient-to-br from-[#00D2FF] via-[#00A3FF] to-[#0061FF] flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,163,255,0.4)] transition-all hover:scale-105 active:scale-95">
          <Sparkles className="size-7 text-white drop-shadow-md" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full bg-[#10C469] border-[3px] border-white shadow-md" />
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
          Assistant IA
        </h1>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#10C469] animate-pulse" />
          <span className="text-xs font-regular text-[#10C469]">
            En ligne · Temps de réponse ~2s
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Button
        type="button"
        className="h-10 rounded-lg bg-blue-600 px-6 font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
        onClick={() => onNewConversation?.()}
      >
        Nouvelle conversation
      </Button>
    </div>
  </div>
);
