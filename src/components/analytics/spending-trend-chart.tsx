"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { useSpendingTrends } from "@/hooks/use-analytics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function SpendingTrendChart() {
  const { data, isLoading } = useSpendingTrends(12);

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Harcama Trendi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Harcama Trendi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-16">
            Henüz trend verisi yok
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    month: item.month,
    total: Number(item.total_try),
  }));

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Harcama Trendi (Son 12 Ay)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.8 0.15 195)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="50%"
                    stopColor="oklch(0.65 0.22 295)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.7 0.25 340)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.8 0.15 195 / 15%)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="oklch(0.8 0.15 195 / 15%)"
                tick={{ fill: "oklch(0.75 0 0)" }}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="oklch(0.8 0.15 195 / 15%)"
                tick={{ fill: "oklch(0.75 0 0)" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Toplam"]}
                contentStyle={{
                  backgroundColor: "oklch(0.18 0.02 265 / 80%)",
                  border: "1px solid oklch(0.8 0.15 195 / 30%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  backdropFilter: "blur(12px)",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="oklch(0.7 0.25 340)"
                strokeWidth={3}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
