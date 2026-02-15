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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await getAuthUser();
  if (error) return error;
  const { id } = await params;

  const subscription = await prisma.subscription.findFirst({
    where: { id, userId: user!.id },
    include: { category: true },
  });

  if (!subscription) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(await enrichSubscription(subscription));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await getAuthUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.subscription.findFirst({
    where: { id, userId: user!.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const updateData: any = {};

  if (body.name !== undefined) updateData.name = body.name;
  if (body.price !== undefined) updateData.price = new Decimal(body.price);
  if (body.currency !== undefined) updateData.currency = body.currency;
  if (body.billing_period !== undefined) updateData.billingPeriod = body.billing_period;
  if (body.category_id !== undefined) updateData.categoryId = body.category_id;
  if (body.is_free_trial !== undefined) updateData.isFreeTrial = body.is_free_trial;
  if (body.free_trial_end_date !== undefined)
    updateData.freeTrialEndDate = body.free_trial_end_date
      ? new Date(body.free_trial_end_date)
      : null;
  if (body.is_active !== undefined) updateData.isActive = body.is_active;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.notes !== undefined) updateData.notes = body.notes;
  if (body.url !== undefined) updateData.url = body.url;
  if (body.logo_url !== undefined) updateData.logoUrl = body.logo_url;

  // Recompute next billing date if period or start date changed
  if (body.billing_period || body.start_date) {
    const startDate = body.start_date
      ? new Date(body.start_date)
      : existing.startDate;
    const period = body.billing_period || existing.billingPeriod;
    updateData.nextBillingDate = computeNextBillingDate(startDate, period);
    if (body.start_date) updateData.startDate = new Date(body.start_date);
  }

  const subscription = await prisma.subscription.update({
    where: { id },
    data: updateData,
    include: { category: true },
  });

  return NextResponse.json(await enrichSubscription(subscription));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await getAuthUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.subscription.findFirst({
    where: { id, userId: user!.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.subscription.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
