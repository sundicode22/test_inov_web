"use client";

import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, MapPin, Pencil, Trash2, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDeleteEvent, useEvent } from "@/hooks/use-agenda";
import { toast } from "sonner";
import type { AgendaEvent } from "@/types/api";

export interface EventDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: AgendaEvent | null;
  onEdit: (event: AgendaEvent) => void;
}

export function EventDetailSheet({
  open,
  onOpenChange,
  event,
  onEdit,
}: EventDetailSheetProps) {
  const deleteEvent = useDeleteEvent();
  const { data: remote } = useEvent(open && event?.id ? event.id : undefined);
  const display = remote ?? event;

  const handleDelete = async () => {
    if (!event) return;
    if (!window.confirm("Supprimer cet événement ? Cette action est irréversible.")) {
      return;
    }
    try {
      await deleteEvent.mutateAsync(event.id);
      toast.success("Événement supprimé");
      onOpenChange(false);
    } catch {
      toast.error("Impossible de supprimer l'événement");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        showCloseButton
        className="flex w-full flex-col border-l-0 p-0 shadow-2xl sm:max-w-[min(98vw,1040px)] lg:max-w-[min(98vw,1200px)]"
      >
        <div className="flex h-full flex-col bg-white">
          <SheetHeader className="space-y-1.5 border-b border-[#EEEEEE] p-6 pb-4 text-left">
            <SheetTitle className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Détails de l&apos;événement
            </SheetTitle>
            <SheetDescription className="text-sm text-[#64748B]">
              Informations du rendez-vous.
            </SheetDescription>
          </SheetHeader>

          {display ? (
            <>
              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                <div>
                  <p className="text-sm font-semibold text-[#4B5563]">
                    Titre
                  </p>
                  <p className="mt-2 text-lg font-bold text-[#111111]">
                    {display.title}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[10px] border border-[#E5E5E5] bg-[#F4F4F5] p-4">
                    <p className="text-sm font-semibold text-[#4B5563]">
                      Date
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#111111]">
                      {format(new Date(display.date), "EEEE d MMMM yyyy", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                  <div className="rounded-[10px] border border-[#E5E5E5] bg-[#F4F4F5] p-4">
                    <p className="text-sm font-semibold text-[#4B5563]">
                      Heure
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#111111]">
                      <Clock className="size-4 text-[#666666]" />
                      {display.time}
                    </p>
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#E5E5E5] bg-[#F4F4F5] p-4">
                  <p className="text-sm font-semibold text-[#4B5563]">
                    Notes / Lieu
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-medium text-[#111111]">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#666666]" />
                    <span className="min-w-0 whitespace-pre-wrap">
                      {display.notes?.trim() || "—"}
                    </span>
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#E5E5E5] bg-[#F4F4F5] p-4">
                  <p className="text-sm font-semibold text-[#4B5563]">
                    Participants
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#111111]">
                    <Users className="size-4 shrink-0 text-[#666666]" />
                    {display.participants?.trim() || "—"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EEEEEE] p-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-12 rounded-[10px] text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                  disabled={deleteEvent.isPending}
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 size-4" />
                  Supprimer
                </Button>
                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-[10px] border border-[#E5E5E5] px-5 text-sm font-semibold text-[#374151]"
                    onClick={() => onOpenChange(false)}
                  >
                    Fermer
                  </Button>
                  <Button
                    type="button"
                    className="h-12 rounded-[10px] bg-[#0066FF] px-5 text-sm font-semibold text-white shadow-md shadow-[#0066FF]/25 hover:bg-[#0055dd]"
                    onClick={() => {
                      onEdit(display);
                      onOpenChange(false);
                    }}
                  >
                    <Pencil className="mr-2 size-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-[#64748B]">
              Aucun événement sélectionné.
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
