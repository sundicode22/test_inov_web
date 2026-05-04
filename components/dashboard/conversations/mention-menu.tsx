"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { AgentTool } from "@/types/api";
import { cn } from "@/lib/utils";
import { Hammer, Search } from "lucide-react";

interface MentionMenuProps {
  tools: AgentTool[];
  search: string;
  onSelect: (tool: AgentTool) => void;
  onClose: () => void;
}

export const MentionMenu = ({
  tools,
  search,
  onSelect,
  onClose,
}: MentionMenuProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevSearch, setPrevSearch] = useState(search);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setSelectedIndex(0);
  }

  const filteredTools = useMemo(() => {
    return tools.filter((tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [tools, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        if (filteredTools[selectedIndex]) {
          e.preventDefault();
          onSelect(filteredTools[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredTools, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    const selectedElement = scrollRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (filteredTools.length === 0) return null;

  return (
    <div className="absolute bottom-full mb-2 left-0 w-80 max-h-64 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-2xl z-50 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <Search className="size-3.5 text-slate-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Outils Disponibles</span>
      </div>
      <div 
        ref={scrollRef}
        className="overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200"
      >
        {filteredTools.map((tool, index) => (
          <button
            key={tool.name}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg transition-all flex flex-col gap-0.5",
              selectedIndex === index 
                ? "bg-blue-50 text-blue-700" 
                : "hover:bg-slate-50 text-slate-700"
            )}
            onClick={() => onSelect(tool)}
          >
            <div className="flex items-center gap-2">
              <Hammer className={cn(
                "size-3.5",
                selectedIndex === index ? "text-blue-500" : "text-slate-400"
              )} />
              <span className="font-semibold text-sm">{tool.name}</span>
            </div>
            <p className={cn(
              "text-[11px] line-clamp-1",
              selectedIndex === index ? "text-blue-600/70" : "text-slate-500"
            )}>
              {tool.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
