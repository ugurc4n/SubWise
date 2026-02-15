"use client";

import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatShortDate, daysUntil } from "@/lib/format";
import { useUpcomingPayments } from "@/hooks/use-analytics";
import { ServiceIcon } from "@/components/shared/service-icon";
import { CurrencyBadge } from "@/components/shared/currency-badge";

export function UpcomingPayments() {
  const { data, isLoading } = useUpcomingPayments(30);

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Yaklaşan Ödemeler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Yaklaşan Ödemeler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-8 text-center">
            <CalendarClock className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              30 gün içinde ödeme yok
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Yaklaşan Ödemeler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.slice(0, 7).map((payment) => {
          const days = daysUntil(payment.next_billing_date);
          return (
            <div
              key={payment.subscription_id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 transition-colors border border-transparent hover:border-cyan-500/20"
            >
              <ServiceIcon
                name={payment.name}
                logoUrl={payment.logo_url}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{payment.name}</p>
                <p className="text-xs text-muted-foreground">
                  {days === 0
                    ? "Bugün"
                    : days === 1
                    ? "Yarın"
                    : `${days} gün sonra`}{" "}
                  · {formatShortDate(payment.next_billing_date)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {formatCurrency(payment.price, payment.currency)}
                </p>
                {payment.currency !== "TRY" && (
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(payment.price_in_try)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
