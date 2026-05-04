"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Video, Camera, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type AttachmentSource = "image" | "video" | "camera";

type ChatAttachmentPickerProps = {
  onFiles: (files: File[], source: AttachmentSource) => void;
  disabled?: boolean;
};

export function ChatAttachmentPicker({
  onFiles,
  disabled,
}: ChatAttachmentPickerProps) {
  const [open, setOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (source: AttachmentSource) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files;
      if (list?.length) {
        onFiles(Array.from(list), source);
      }
      e.target.value = "";
      setOpen(false);
    };

  const trigger = (ref: React.RefObject<HTMLInputElement | null>) => {
    setOpen(false);
    requestAnimationFrame(() => ref.current?.click());
  };

  return (
    <>
      <input
        ref={imageRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        tabIndex={-1}
        onChange={handleChange("image")}
      />
      <input
        ref={videoRef}
        type="file"
        className="hidden"
        accept="video/*"
        multiple
        tabIndex={-1}
        onChange={handleChange("video")}
      />
      <input
        ref={cameraRef}
        type="file"
        className="hidden"
        accept="image/*"
        capture="environment"
        tabIndex={-1}
        onChange={handleChange("camera")}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            className="size-9 rounded-xl text-slate-400 hover:bg-white/50 hover:text-slate-700"
            aria-label="Joindre un fichier"
          >
            <Paperclip className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 p-1.5 shadow-lg"
          align="start"
          side="top"
          sideOffset={8}
        >
          <p className="px-2 py-1.5 text-[11px] font-semibold text-muted-foreground">
            Ajouter
          </p>
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground",
                "hover:bg-muted/80 transition-colors",
              )}
              onClick={() => trigger(imageRef)}
            >
              <span className="flex size-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <ImageIcon className="size-4" />
              </span>
              Images
            </button>
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground",
                "hover:bg-muted/80 transition-colors",
              )}
              onClick={() => trigger(videoRef)}
            >
              <span className="flex size-8 items-center justify-center rounded-md bg-violet-50 text-violet-600">
                <Video className="size-4" />
              </span>
              Vidéos
            </button>
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-foreground",
                "hover:bg-muted/80 transition-colors",
              )}
              onClick={() => trigger(cameraRef)}
            >
              <span className="flex size-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                <Camera className="size-4" />
              </span>
              Appareil photo
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
