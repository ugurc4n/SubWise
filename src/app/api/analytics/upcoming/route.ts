import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { getLatestRate, convertToTRY } from "@/lib/exchange-rates";

export async function GET(request: NextRequest) {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const days = parseInt(request.nextUrl.searchParams.get("days") || "30");
  const now = new Date();
  const limit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: user!.id,
      isActive: true,
      nextBillingDate: { gte: now, lte: limit },
    },
    include: { category: true },
    orderBy: { nextBillingDate: "asc" },
  });

  const upcoming = await Promise.all(
    subscriptions.map(async (sub) => {
      const rate = await getLatestRate(sub.currency);
      return {
        subscription_id: sub.id,
        name: sub.name,
        price: sub.price.toNumber(),
        currency: sub.currency,
        price_in_try: convertToTRY(sub.price.toNumber(), sub.currency, rate),
        next_billing_date: sub.nextBillingDate.toISOString(),
        logo_url: sub.logoUrl,
        category_name: sub.category?.name || null,
      };
    })
  );

  return NextResponse.json(upcoming);
}
