"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SpendingOverview } from "@/components/dashboard/spending-overview";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { TrialWarnings } from "@/components/dashboard/trial-warnings";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl mx-auto p-6 lg:p-8">
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
          </div>
        </main>
      </div>
    </div>
  );
}
