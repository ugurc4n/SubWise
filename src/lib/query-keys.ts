export const queryKeys = {
  subscriptions: {
    all: ["subscriptions"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["subscriptions", "list", filters] as const,
    detail: (id: string) => ["subscriptions", "detail", id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  analytics: {
    all: ["analytics"] as const,
    summary: () => ["analytics", "summary"] as const,
    byCategory: () => ["analytics", "by-category"] as const,
    trends: (months?: number) => ["analytics", "trends", months] as const,
    upcoming: (days?: number) => ["analytics", "upcoming", days] as const,
    trials: () => ["analytics", "trials"] as const,
  },
  exchangeRates: {
    latest: () => ["exchange-rates", "latest"] as const,
  },
};
