import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  CreateEventRequest,
  ListEventsParams,
  UpdateEventRequest,
} from "@/types/api";

export function useEvents(params?: ListEventsParams) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => api.agenda.list(params),
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["events", "detail", id],
    queryFn: () => api.agenda.get(id!),
    enabled: Boolean(id),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventRequest) => api.agenda.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventRequest }) =>
      api.agenda.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.agenda.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
