"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { EventFormSheet } from "@/components/dashboard/calendrier/event-form-sheet";
import { EventDetailSheet } from "@/components/dashboard/calendrier/event-detail-sheet";
import { CalendarView } from "@/components/dashboard/calendrier/calendar-view";
import { AgendaSidebar } from "@/components/dashboard/calendrier/agenda-sidebar";
import type { AgendaEvent } from "@/types/api";

type FormState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; event: AgendaEvent };

export default function CalendrierPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formState, setFormState] = useState<FormState>({ open: false });
  const [detailEvent, setDetailEvent] = useState<AgendaEvent | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto bg-[#F5F5F5] p-6 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111111] tracking-tight">
            Calendrier
          </h1>
          <p className="text-base text-[#666666] mt-0.5">
            Gérez vos événements et rendez-vous.
          </p>
        </div>
        <Button
          className="h-11 shrink-0 rounded-[14px] bg-[#0066FF] px-5 text-base font-semibold text-white shadow-none hover:bg-[#0055dd] active:bg-[#004bcc] flex items-center gap-2"
          onClick={() => setFormState({ open: true, mode: "create" })}
        >
          <Plus className="size-5 stroke-[2.5]" />
          <span>Nouvel événement</span>
        </Button>
      </div>

      <EventFormSheet
        open={formState.open}
        onOpenChange={(open) => {
          if (!open) setFormState({ open: false });
        }}
        mode={formState.open ? formState.mode : "create"}
        editingEvent={
          formState.open && formState.mode === "edit" ? formState.event : null
        }
        defaultDate={format(selectedDate, "yyyy-MM-dd")}
      />

      <EventDetailSheet
        open={detailEvent !== null}
        onOpenChange={(open) => {
          if (!open) setDetailEvent(null);
        }}
        event={detailEvent}
        onEdit={(event) => {
          setFormState({ open: true, mode: "edit", event });
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1">
        <div className="xl:col-span-8 flex flex-col min-h-0 h-full">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        <div className="xl:col-span-4 min-h-0 h-full">
          <AgendaSidebar
            selectedDate={selectedDate}
            onOpenEventDetails={setDetailEvent}
          />
        </div>
      </div>
    </div>
  );
}
