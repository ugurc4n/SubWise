"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SpendingOverview } from "@/components/dashboard/spending-overview";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { TrialWarnings } from "@/components/dashboard/trial-warnings";
import { HeroSection } from "@/components/landing/hero-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // If user is not logged in, show landing page
  if (!session) {
    return <HeroSection />;
  }

  // If user is logged in, show dashboard
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ana Sayfa</h1>
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
