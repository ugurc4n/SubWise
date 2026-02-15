"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { CategoryListResponse } from "@/types/subscription";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => apiClient.get<CategoryListResponse>("/categories"),
  });
}
