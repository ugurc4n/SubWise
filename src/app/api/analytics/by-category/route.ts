import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { getLatestRate, convertToTRY, normalizeToMonthly } from "@/lib/exchange-rates";

export async function GET() {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user!.id, isActive: true },
    include: { category: true },
  });

  const categories: Record<string, { color: string | null; icon: string | null; total: number; count: number }> = {};

  for (const sub of subscriptions) {
    const catName = sub.category?.name || "Diğer";
    const catColor = sub.category?.color || "#94a3b8";
    const catIcon = sub.category?.icon || null;

    if (!categories[catName]) {
      categories[catName] = { color: catColor, icon: catIcon, total: 0, count: 0 };
    }

    const monthly = normalizeToMonthly(sub.price.toNumber(), sub.billingPeriod);
    const rate = await getLatestRate(sub.currency);
    categories[catName].total += convertToTRY(monthly, sub.currency, rate);
    categories[catName].count += 1;
  }

  const result = Object.entries(categories)
    .map(([name, data]) => ({
      category_name: name,
      category_color: data.color,
      category_icon: data.icon,
      total_monthly_try: Math.round(data.total * 100) / 100,
      subscription_count: data.count,
    }))
    .sort((a, b) => b.total_monthly_try - a.total_monthly_try);

  return NextResponse.json(result);
}
