"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type {
  Subscription,
  SubscriptionCreate,
  SubscriptionListResponse,
  SubscriptionUpdate,
} from "@/types/subscription";

export function useSubscriptions(filters?: { active?: boolean; category_id?: string }) {
  return useQuery({
    queryKey: queryKeys.subscriptions.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.active !== undefined) params.set("active", String(filters.active));
      if (filters?.category_id) params.set("category_id", filters.category_id);
      const query = params.toString() ? `?${params}` : "";
      return apiClient.get<SubscriptionListResponse>(`/subscriptions${query}`);
    },
  });
}

export function useSubscription(id: string) {
  return useQuery({
    queryKey: queryKeys.subscriptions.detail(id),
    queryFn: () => apiClient.get<Subscription>(`/subscriptions/${id}`),
    enabled: !!id,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscriptionCreate) =>
      apiClient.post<Subscription>("/subscriptions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubscriptionUpdate }) =>
      apiClient.put<Subscription>(`/subscriptions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/subscriptions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all });
    },
  });
}
