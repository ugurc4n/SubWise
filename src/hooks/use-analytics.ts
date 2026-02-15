"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type {
  CategoryBreakdown,
  SpendingSummary,
  SpendingTrend,
  TrialInfo,
  UpcomingPayment,
} from "@/types/analytics";

export function useSpendingSummary() {
  return useQuery({
    queryKey: queryKeys.analytics.summary(),
    queryFn: () => apiClient.get<SpendingSummary>("/analytics/summary"),
  });
}

export function useCategoryBreakdown() {
  return useQuery({
    queryKey: queryKeys.analytics.byCategory(),
    queryFn: () => apiClient.get<CategoryBreakdown[]>("/analytics/by-category"),
  });
}

export function useSpendingTrends(months: number = 12) {
  return useQuery({
    queryKey: queryKeys.analytics.trends(months),
    queryFn: () => apiClient.get<SpendingTrend[]>(`/analytics/trends?months=${months}`),
  });
}

export function useUpcomingPayments(days: number = 30) {
  return useQuery({
    queryKey: queryKeys.analytics.upcoming(days),
    queryFn: () => apiClient.get<UpcomingPayment[]>(`/analytics/upcoming?days=${days}`),
  });
}

export function useActiveTrials() {
  return useQuery({
    queryKey: queryKeys.analytics.trials(),
    queryFn: () => apiClient.get<TrialInfo[]>("/analytics/trials"),
  });
}
