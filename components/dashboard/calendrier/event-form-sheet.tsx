"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useCreateEvent, useUpdateEvent, useEvent } from "@/hooks/use-agenda";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AgendaEvent } from "@/types/api";

const formSchema = z.object({
  title: z.string().min(2, "Le titre doit faire au moins 2 caractères"),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  participants: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

/** Same height, width, radius, border, focus ring for every control */
const CONTROL =
  "h-10 w-full min-h-10 min-w-0 rounded-lg border border-[#E5E5E5] bg-[#F4F4F5] px-3 text-sm font-normal text-[#111111] shadow-none transition-[color,box-shadow] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#0066FF] focus-visible:ring-2 focus-visible:ring-[#0066FF]/20 disabled:opacity-50";

const TEXTAREA_CONTROL =
  "min-h-[120px] w-full min-w-0 resize-y rounded-lg border border-[#E5E5E5] bg-[#F4F4F5] px-3 py-3 text-sm font-normal text-[#111111] shadow-none transition-[color,box-shadow] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#0066FF] focus-visible:ring-2 focus-visible:ring-[#0066FF]/20 disabled:opacity-50";

export interface EventFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  /** Required when mode is edit (list row / detail handoff) */
  editingEvent?: AgendaEvent | null;
  defaultDate?: string;
}

export function EventFormSheet({
  open,
  onOpenChange,
  mode,
  editingEvent,
  defaultDate,
}: EventFormSheetProps) {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const editId = mode === "edit" && editingEvent ? editingEvent.id : undefined;
  const { data: remoteEvent } = useEvent(open ? editId : undefined);

  const sourceEvent =
    mode === "edit" ? (remoteEvent ?? editingEvent ?? null) : null;

  const sourceFingerprint =
    mode === "edit" && sourceEvent
      ? [
          sourceEvent.id,
          sourceEvent.title,
          sourceEvent.date,
          sourceEvent.time,
          sourceEvent.participants,
          sourceEvent.notes,
        ].join("|")
      : "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      participants: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && sourceEvent) {
      form.reset({
        title: sourceEvent.title,
        date: sourceEvent.date,
        time: sourceEvent.time,
        participants: sourceEvent.participants || "",
        notes: sourceEvent.notes || "",
      });
    } else if (mode === "create") {
      form.reset({
        title: "",
        date: defaultDate || "",
        time: "",
        participants: "",
        notes: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset is intentional when sheet opens or source changes
  }, [open, mode, defaultDate, sourceFingerprint]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (mode === "edit" && editingEvent) {
        await updateEvent.mutateAsync({
          id: editingEvent.id,
          data: {
            title: values.title,
            date: values.date,
            time: values.time,
            participants: values.participants,
            notes: values.notes,
          },
        });
        toast.success("Événement mis à jour");
      } else {
        await createEvent.mutateAsync({
          title: values.title,
          date: values.date,
          time: values.time,
          participants: values.participants,
          notes: values.notes,
        });
        toast.success("Événement créé avec succès");
      }
      onOpenChange(false);
    } catch {
      toast.error(
        mode === "edit"
          ? "Erreur lors de la mise à jour"
          : "Erreur lors de la création de l'événement",
      );
    }
  };

  const pending = createEvent.isPending || updateEvent.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        showCloseButton
        className="flex w-full flex-col border-l-0 p-0 shadow-2xl sm:max-w-[min(98vw,1040px)] lg:max-w-[min(98vw,1200px)]"
      >
        <div className="flex h-full flex-col bg-white">
          <SheetHeader className="space-y-1.5 border-b border-[#EEEEEE] p-6 pb-4 text-left">
            <SheetTitle className="text-2xl font-bold tracking-tight text-[#0F172A]">
              {mode === "edit" ? "Modifier l'événement" : "Nouvel événement"}
            </SheetTitle>
            <SheetDescription className="text-sm text-[#64748B]">
              {mode === "edit"
                ? "Mettez à jour les informations de ce rendez-vous."
                : "Remplissez les détails pour ajouter un rendez-vous à votre calendrier."}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <Form {...form}>
              <form
                id="event-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm">
                        Titre de l&apos;événement
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Réunion d'équipe..."
                          {...field}
                          className={cn(CONTROL, "bg-[#F4F4F5]")}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <p className="text-sm">Date et heure</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="size-3.5 shrink-0" />
                            Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className={cn(
                                    CONTROL,
                                    "justify-start font-normal",
                                    !field.value && "text-[#9CA3AF]",
                                  )}
                                >
                                  {field.value ? (
                                    format(
                                      new Date(field.value),
                                      "d MMMM yyyy",
                                      {
                                        locale: fr,
                                      },
                                    )
                                  ) : (
                                    <span>Choisir une date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden rounded-lg border border-[#E5E5E5] p-0 shadow-xl"
                              align="start"
                            >
                              <CalendarPicker
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(
                                    date ? format(date, "yyyy-MM-dd") : "",
                                  )
                                }
                                initialFocus
                                locale={fr}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2 text-sm">
                            <Clock className="size-3.5 shrink-0" />
                            Heure
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                size="default"
                                className={cn(CONTROL, "w-full min-h-10")}
                              >
                                <SelectValue placeholder="Sélectionner une heure" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 48 }, (_, i) => {
                                const hours = Math.floor(i / 2);
                                const minutes = (i % 2) * 30;
                                const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                                return (
                                  <SelectItem key={timeStr} value={timeStr}>
                                    {timeStr}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <Users className="size-3.5 shrink-0" />
                        Participants
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 5 personnes..."
                          {...field}
                          className={cn(CONTROL, "bg-[#F4F4F5]")}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <FileText className="size-3.5 shrink-0" />
                        Notes / Lieu
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Salle A ou Visio Teams..."
                          rows={4}
                          {...field}
                          className={cn(TEXTAREA_CONTROL, "bg-[#F4F4F5]")}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-[#EEEEEE] bg-white p-6">
            <Button
              type="button"
              variant="outline"
              className="h-11 min-w-[120px] shrink-0 rounded-lg border border-[#E5E5E5] bg-white px-6 text-sm font-semibold text-[#374151] shadow-sm hover:bg-[#F9FAFB]"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              form="event-form"
              type="submit"
              className="h-11 min-w-[140px] shrink-0 rounded-lg bg-[#0066FF] px-6 text-sm font-semibold text-white shadow-md shadow-[#0066FF]/25 hover:bg-[#0055dd]"
              disabled={pending}
            >
              {pending
                ? mode === "edit"
                  ? "Enregistrement..."
                  : "Création..."
                : "Confirmer"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
