"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { useCategoryBreakdown } from "@/hooks/use-analytics";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
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

export function CategoryChart() {
  const { data, isLoading } = useCategoryBreakdown();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
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
        <CardTitle className="text-base font-semibold">Kategoriler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
