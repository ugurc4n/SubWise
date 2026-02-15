"use client";

import { CreditCard, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { useSpendingSummary } from "@/hooks/use-analytics";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
}

function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SpendingOverview() {
  const { data, isLoading } = useSpendingSummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Aylık Toplam"
        value={formatCurrency(data?.total_monthly_try || 0)}
        icon={<Wallet className="w-5 h-5 text-primary" />}
        subtitle="Tüm abonelikler"
      />
      <StatCard
        title="Yıllık Toplam"
        value={formatCurrency(data?.total_yearly_try || 0)}
        icon={<TrendingUp className="w-5 h-5 text-primary" />}
        subtitle="Tahmini yıllık"
      />
      <StatCard
        title="Aktif Abonelik"
        value={String(data?.subscription_count || 0)}
        icon={<CreditCard className="w-5 h-5 text-primary" />}
        subtitle="Toplam abonelik sayısı"
      />
    </div>
  );
}
