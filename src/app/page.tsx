"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SpendingOverview } from "@/components/dashboard/spending-overview";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { TrialWarnings } from "@/components/dashboard/trial-warnings";

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Abonelik harcamalarınızın genel görünümü
          </p>
        </div>

        <TrialWarnings />
        <SpendingOverview />

        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryChart />
          <UpcomingPayments />
        </div>
      </div>
    </DashboardLayout>
  );
}
