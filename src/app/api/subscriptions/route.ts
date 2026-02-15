import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { getLatestRate, convertToTRY } from "@/lib/exchange-rates";
import { computeNextBillingDate } from "@/lib/subscription-helpers";
import { Decimal } from "@prisma/client/runtime/library";

async function enrichSubscription(sub: any) {
  const rate = await getLatestRate(sub.currency);
  const priceInTry = convertToTRY(sub.price.toNumber(), sub.currency, rate);

  let freeTrialDaysRemaining: number | null = null;
  if (sub.isFreeTrial && sub.freeTrialEndDate) {
    const diff = new Date(sub.freeTrialEndDate).getTime() - Date.now();
    freeTrialDaysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return {
    id: sub.id,
    name: sub.name,
    price: sub.price.toNumber(),
    currency: sub.currency,
    price_in_try: priceInTry,
    billing_period: sub.billingPeriod,
    category: sub.category
      ? {
          id: sub.category.id,
          name: sub.category.name,
          slug: sub.category.slug,
          icon: sub.category.icon,
          color: sub.category.color,
        }
      : null,
    start_date: sub.startDate.toISOString(),
    next_billing_date: sub.nextBillingDate.toISOString(),
    is_free_trial: sub.isFreeTrial,
    free_trial_end_date: sub.freeTrialEndDate?.toISOString() || null,
    free_trial_days_remaining: freeTrialDaysRemaining,
    is_active: sub.isActive,
    description: sub.description,
    notes: sub.notes,
    url: sub.url,
    logo_url: sub.logoUrl,
    created_at: sub.createdAt.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const { searchParams } = request.nextUrl;
  const active = searchParams.get("active") !== "false";
  const categoryId = searchParams.get("category_id");

  const where: any = { userId: user!.id };
  if (active) where.isActive = true;
  if (categoryId) where.categoryId = categoryId;

  const subscriptions = await prisma.subscription.findMany({
    where,
    include: { category: true },
    orderBy: { nextBillingDate: "asc" },
  });

  const items = await Promise.all(subscriptions.map(enrichSubscription));

  return NextResponse.json({ items, total: items.length });
}

export async function POST(request: NextRequest) {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const body = await request.json();
  const startDate = new Date(body.start_date);
  const nextBillingDate = computeNextBillingDate(startDate, body.billing_period);

  const subscription = await prisma.subscription.create({
    data: {
      userId: user!.id,
      categoryId: body.category_id || null,
      name: body.name,
      description: body.description || null,
      logoUrl: body.logo_url || null,
      price: new Decimal(body.price),
      currency: body.currency || "TRY",
      billingPeriod: body.billing_period || "monthly",
      startDate,
      nextBillingDate,
      isFreeTrial: body.is_free_trial || false,
      freeTrialEndDate: body.free_trial_end_date
        ? new Date(body.free_trial_end_date)
        : null,
      notes: body.notes || null,
      url: body.url || null,
    },
    include: { category: true },
  });

  const enriched = await enrichSubscription(subscription);
  return NextResponse.json(enriched, { status: 201 });
}
