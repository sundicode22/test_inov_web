"use client";

import React from "react";
import { format, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEvents } from "@/hooks/use-agenda";
import type { AgendaEvent } from "@/types/api";

/** Reference palette: blue, purple, green accent rotation */
const ACCENT_PALETTE = [
  {
    bar: "border-l-[#0066FF]",
    dot: "bg-[#0066FF]",
    join: "bg-[#0066FF] hover:bg-[#0055dd]",
  },
  {
    bar: "border-l-[#9900FF]",
    dot: "bg-[#9900FF]",
    join: "bg-[#9900FF] hover:bg-[#8800e6]",
  },
  {
    bar: "border-l-[#00AA33]",
    dot: "bg-[#00AA33]",
    join: "bg-[#00AA33] hover:bg-[#00992e]",
  },
] as const;

/** Pastel badge + darker number + matching status dot (orange / blue rotation) */
const UPCOMING_BADGE_STYLES = [
  {
    box: "bg-[#E8F1FF]",
    day: "text-[#0066FF]",
    number: "text-[#0047CC]",
    dot: "bg-[#0066FF]",
  },
  {
    box: "bg-[#FFF3E6]",
    day: "text-[#FF8800]",
    number: "text-[#E07000]",
    dot: "bg-[#FF8800]",
  },
] as const;

function capitalizeMonthLabel(formatted: string) {
  const parts = formatted.trim().split(/\s+/);
  if (parts.length < 2) return formatted;
  const month = parts[parts.length - 1];
  const dayParts = parts.slice(0, -1).join(" ");
  return `${dayParts} ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
}

interface AgendaSidebarProps {
  selectedDate: Date;
  onOpenEventDetails: (event: AgendaEvent) => void;
}

export function AgendaSidebar({
  selectedDate,
  onOpenEventDetails,
}: AgendaSidebarProps) {
  const { data: events, isLoading } = useEvents({
    date: format(selectedDate, "yyyy-MM-dd"),
  });

  const { data: upcomingEvents, isLoading: isLoadingUpcoming } = useEvents({
    range: "week",
  });

  const dateLine = capitalizeMonthLabel(
    format(selectedDate, "d MMMM", { locale: fr }),
  );
  const sectionHeading = isToday(selectedDate)
    ? `Aujourd'hui - ${dateLine}`
    : dateLine;

  return (
    <div className="space-y-10 overflow-y-auto pr-4 -mr-4 pb-8 custom-scrollbar">
      <div className="space-y-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight text-[#111111] md:text-xl px-2">
            {sectionHeading}
          </h3>
          <span className="shrink-0 text-sm font-medium text-[#666666] px-2">
            {events?.length || 0} événement
            {(events?.length || 0) !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            [1, 2].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
              >
                <Skeleton className="absolute left-3 top-5 bottom-5 w-1.5 rounded-full bg-slate-200" />
                <div className="flex flex-col gap-4 py-5 pl-8 pr-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full max-w-[280px]" />
                  <div className="my-1 h-px bg-[#E5E7EB]" />
                  <div className="flex gap-3">
                    <Skeleton className="h-11 flex-1 rounded-full" />
                    <Skeleton className="h-11 flex-1 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : events && events.length > 0 ? (
            events.map((event, idx) => {
              const accent = ACCENT_PALETTE[idx % ACCENT_PALETTE.length];
              const metaClass = "text-sm font-medium text-[#65676B]";
              const iconClass = "size-[18px] shrink-0 text-[#65676B]";
              const peopleLabel = `${event.participants || "0"} personne${
                (Number(event.participants) || 0) !== 1 ? "s" : ""
              }`;

              return (
                <div
                  key={event.id}
                  className={cn(
                    "relative overflow-hidden rounded-[18px] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]",
                    `border-l-4 ${accent.bar}`,
                  )}
                >
                  <div className="min-w-0 space-y-3 py-5 pl-8 pr-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-bold leading-snug text-[#111111]">
                        {event.title}
                      </h4>
                      <span
                        className={cn(
                          "mt-0.5 size-2.5 shrink-0 rounded-full",
                          accent.dot,
                        )}
                        aria-hidden
                      />
                    </div>

                    <div className="space-y-2">
                      <div className={cn("flex items-center gap-2", metaClass)}>
                        <Clock
                          className={iconClass}
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span>{event.time}</span>
                      </div>
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-x-5 gap-y-1.5",
                          metaClass,
                        )}
                      >
                        <span className="inline-flex items-center gap-2">
                          <MapPin
                            className={iconClass}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          <span className="min-w-0">
                            {event.notes?.trim() || "Salle de réunion"}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Users
                            className={iconClass}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          <span>{peopleLabel}</span>
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-[#E5E7EB]" aria-hidden />

                    <div className="flex gap-3 pt-0.5">
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-11 flex-1 rounded-lg border-0 bg-[#F0F2F5] text-sm font-semibold text-[#111111] shadow-none hover:bg-[#E4E6EB]"
                        onClick={() => onOpenEventDetails(event)}
                      >
                        Détails
                      </Button>
                      <Button
                        type="button"
                        className={cn(
                          "h-11 flex-1 rounded-lg border-0 text-sm font-semibold text-white shadow-none",
                          accent.join,
                        )}
                      >
                        Rejoindre
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E0E0E0] bg-white px-4 py-16 text-center">
              <p className="text-base font-medium text-[#666666]">
                Aucun événement pour cette journée
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5 p-2">
        <h3 className="text-lg font-bold leading-tight text-[#111111] md:text-xl">
          À venir cette semaine
        </h3>

        <div className="space-y-3">
          {isLoadingUpcoming ? (
            [1, 2].map((i) => (
              <Skeleton
                key={i}
                className="h-[100px] w-full rounded-[18px] border border-[#E5E7EB]"
              />
            ))
          ) : upcomingEvents && upcomingEvents.length > 0 ? (
            upcomingEvents.map((item, idx) => {
              const badge =
                UPCOMING_BADGE_STYLES[idx % UPCOMING_BADGE_STYLES.length];
              const dayAbbrev = format(new Date(item.date), "EEE", {
                locale: fr,
              })
                .replace(/\.$/, "")
                .toUpperCase();

              return (
                <Card
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className="rounded-lg border-none border-0 shadow-[0_1px_4px_rgba(15,23,42,0.05)] transition-colors hover:bg-[#FAFAFA] cursor-pointer outline-none ring-0"
                  onClick={() => onOpenEventDetails(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenEventDetails(item);
                    }
                  }}
                >
                  <CardContent className="flex min-h-[60px] items-center gap-5 px-4 py-2">
                    <div
                      className={cn(
                        "flex size-12 shrink-0 flex-col items-center justify-center rounded-lg",
                        badge.box,
                      )}
                    >
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase leading-none tracking-[0.08em]",
                          badge.day,
                        )}
                      >
                        {dayAbbrev}
                      </span>
                      <span
                        className={cn(
                          "mt-2 text-lg font-bold leading-none tabular-nums tracking-tight",
                          badge.number,
                        )}
                      >
                        {format(new Date(item.date), "d")}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5 pr-2">
                      <h4 className="text-[15px] font-bold leading-snug text-[#111111]">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[13px] font-medium leading-none text-[#65676B]">
                        <Clock
                          className="size-[17px] shrink-0 text-[#65676B]"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "size-2.5 shrink-0 self-center rounded-full",
                        badge.dot,
                      )}
                      aria-hidden
                    />
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E8E8E8] bg-white p-8 text-center text-sm font-medium text-[#666666]">
              Rien de prévu pour le moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
