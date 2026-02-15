"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SpendingTrendChart } from "@/components/analytics/spending-trend-chart";

export const dynamic = 'force-dynamic';
import { CurrencySummary } from "@/components/analytics/currency-summary";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Finansal Analiz
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Abonelik harcamalarınızın detaylı analizi
        </p>
      </div>

      <SpendingTrendChart />

      <CurrencySummary />
      </div>
    </DashboardLayout>
  );
}
