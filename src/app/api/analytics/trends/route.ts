import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { getLatestRate, convertToTRY, normalizeToMonthly } from "@/lib/exchange-rates";

export async function GET(request: NextRequest) {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const months = parseInt(request.nextUrl.searchParams.get("months") || "12");

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user!.id, isActive: true },
  });

  const now = new Date();
  const trends = [];

  for (let i = months - 1; i >= 0; i--) {
    let month = now.getMonth() - i;
    let year = now.getFullYear();
    while (month < 0) {
      month += 12;
      year -= 1;
    }

    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    let total = 0;
    let count = 0;

    for (const sub of subscriptions) {
      const startMonth = new Date(sub.startDate);
      if (startMonth <= new Date(year, month + 1, 0)) {
        const monthly = normalizeToMonthly(sub.price.toNumber(), sub.billingPeriod);
        const rate = await getLatestRate(sub.currency);
        total += convertToTRY(monthly, sub.currency, rate);
        count += 1;
      }
    }

    trends.push({
      month: monthStr,
      total_try: Math.round(total * 100) / 100,
      subscription_count: count,
    });
  }

  return NextResponse.json(trends);
}
