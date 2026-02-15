export function formatCurrency(amount: number, currency: string = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(date: string | Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

export function daysUntil(date: string | Date): number {
  const target = new Date(date);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getBillingPeriodLabel(period: string): string {
  const labels: Record<string, string> = {
    weekly: "Haftalık",
    monthly: "Aylık",
    yearly: "Yıllık",
  };
  return labels[period] || period;
}
