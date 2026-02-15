"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { useCategoryBreakdown } from "@/hooks/use-analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DEFAULT_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#06b6d4",
  "#f43f5e",
];

export function CategoryBreakdownChart() {
  const { data, isLoading } = useCategoryBreakdown();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Kategori Dağılımı
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
            Kategori Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-16">
            Henüz veri yok
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item.category_name,
    value: Number(item.total_monthly_try),
    color: item.category_color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Kategori Dağılımı (Aylık)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis
                type="number"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <YAxis
                type="category"
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                width={100}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Aylık"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
