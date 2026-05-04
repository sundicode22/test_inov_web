import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export const MessageAI = ({
  children,
  timestamp,
}: {
  children: React.ReactNode;
  timestamp: string;
}) => (
  <div className="flex gap-4">
    <div className="size-9 rounded-xl bg-gradient-to-br from-[#00D2FF] via-[#00A3FF] to-[#0061FF] flex items-center justify-center shrink-0 shadow-[0_8px_20px_-4px_rgba(0,163,255,0.3)]">
      <Sparkles className="size-5 text-white" />
    </div>
    <div className="flex flex-col gap-2 max-w-[85%]">
      <div className="p-4 bg-white rounded-3xl rounded-tl-none border border-slate-100 shadow-sm shadow-slate-200/50">
        <div className="text-[15px] text-slate-800 leading-relaxed font-normal">
          {children}
        </div>
      </div>
      <span className="text-[11px] font-medium text-slate-400 ml-1 uppercase tracking-wider">
        {timestamp}
      </span>
    </div>
  </div>
);

export const MessageUser = ({
  content,
  timestamp,
  user,
}: {
  content: React.ReactNode;
  timestamp: string;
  user: string;
}) => (
  <div className="flex gap-4 flex-row-reverse">
    <Avatar className="size-8 rounded-lg shrink-0 border border-slate-200">
      <AvatarFallback className="bg-blue-600 text-white text-[10px] font-bold">
        {(user?.trim().charAt(0) || "?").toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col gap-2 max-w-[80%] items-end">
      <div className="p-4 bg-blue-600 rounded-2xl rounded-tr-none shadow-xl shadow-blue-600/20 text-white">
        <p className="whitespace-pre-wrap text-sm font-semibold leading-relaxed">
          {content}
        </p>
      </div>
      <span className="text-[10px] font-bold text-slate-400 mr-1">
        {timestamp}
      </span>
    </div>
  </div>
);
