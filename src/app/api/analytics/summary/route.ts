import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { getLatestRate, convertToTRY, normalizeToMonthly } from "@/lib/exchange-rates";

export async function GET() {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user!.id, isActive: true },
  });

  let totalMonthly = 0;
  const currencyTotals: Record<string, number> = {};

  for (const sub of subscriptions) {
    const monthly = normalizeToMonthly(sub.price.toNumber(), sub.billingPeriod);
    currencyTotals[sub.currency] = (currencyTotals[sub.currency] || 0) + monthly;

    const rate = await getLatestRate(sub.currency);
    totalMonthly += convertToTRY(monthly, sub.currency, rate);
  }

  const currencyBreakdown = [];
  for (const [currency, total] of Object.entries(currencyTotals)) {
    const rate = await getLatestRate(currency);
    currencyBreakdown.push({
      currency,
      total: Math.round(total * 100) / 100,
      total_in_try: Math.round(convertToTRY(total, currency, rate) * 100) / 100,
    });
  }

  return NextResponse.json({
    total_monthly_try: Math.round(totalMonthly * 100) / 100,
    total_yearly_try: Math.round(totalMonthly * 12 * 100) / 100,
    subscription_count: subscriptions.length,
    currency_breakdown: currencyBreakdown,
  });
}
