"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEvents } from "@/hooks/use-agenda";
import { format } from "date-fns";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface CalendarViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function CalendarView({
  selectedDate,
  onSelectDate,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const { data: monthEvents } = useEvents();

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
    currentDate,
  );
  const formattedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + year;

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const calendarDays = [];
  // Previous month days
  const prevMonthDays = daysInMonth(year, month - 1);
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, current: false });
  }
  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push({ day: i, current: true });
  }
  // Next month days
  const remainingSlots = 42 - calendarDays.length;
  for (let i = 1; i <= remainingSlots; i++) {
    calendarDays.push({ day: i, current: false });
  }

  return (
    <Card className="rounded-2xl overflow-hidden  bg-white  h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="text-sm md:text-base font-bold text-slate-900">
            {formattedMonth}
          </h2>
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Calendar Body */}
        <div className="px-2 md:px-4 flex flex-col flex-1 pb-4">
          <div className="grid grid-cols-7 mb-2 gap-2 md:gap-4">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-xs md:text-sm font-medium text-slate-600 capitalize"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-6 gap-2 md:gap-4 flex-1">
            {calendarDays.map((dateObj, idx) => {
              const date = new Date(year, month, dateObj.day);
              const isToday =
                dateObj.current &&
                format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd");

              // Check if this day has events in the monthEvents data
              const hasEvents = monthEvents?.some(
                (e) => dateObj.current && e.date === format(date, "yyyy-MM-dd"),
              );

              return (
                <div
                  key={idx}
                  className="w-full h-full flex flex-col items-center justify-center relative group cursor-pointer"
                  onClick={() => {
                    if (dateObj.current) {
                      onSelectDate(date);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] flex flex-col items-center justify-center rounded-xl text-sm md:text-base font-semibold transition-all duration-200",
                      dateObj.current ? "text-slate-900" : "text-slate-300",
                      isToday
                        ? "bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/25 scale-105"
                        : "hover:bg-slate-50",
                      !isToday &&
                        dateObj.current &&
                        "hover:text-[#0066FF] hover:bg-slate-50",
                    )}
                  >
                    {dateObj.day}
                    {hasEvents && !isToday && (
                      <div className="mt-1 size-1.5 rounded-full bg-[#0066FF]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
