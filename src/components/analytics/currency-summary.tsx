"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { useSpendingSummary } from "@/hooks/use-analytics";
import { CurrencyBadge } from "@/components/shared/currency-badge";

export function CurrencySummary() {
  const { data, isLoading } = useSpendingSummary();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Para Birimi Özeti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const breakdown = data?.currency_breakdown || [];

  if (breakdown.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Para Birimi Özeti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Henüz veri yok
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Para Birimi Özeti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {breakdown.map((item) => (
            <div
              key={item.currency}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CurrencyBadge currency={item.currency} />
                <span className="text-sm font-medium">
                  {formatCurrency(item.total, item.currency)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatCurrency(item.total_in_try)} TL
              </span>
            </div>
          ))}

          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold">Toplam (Aylık)</span>
            <span className="text-sm font-semibold">
              {formatCurrency(data?.total_monthly_try || 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
