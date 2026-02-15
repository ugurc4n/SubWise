import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const { user, error } = await getAuthUser();
  if (error) return error;

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: user!.id,
      isActive: true,
      isFreeTrial: true,
      freeTrialEndDate: { not: null },
    },
    orderBy: { freeTrialEndDate: "asc" },
  });

  const trials = subscriptions.map((sub) => {
    const daysRemaining = Math.max(
      0,
      Math.ceil(
        (new Date(sub.freeTrialEndDate!).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    );

    return {
      subscription_id: sub.id,
      name: sub.name,
      free_trial_end_date: sub.freeTrialEndDate!.toISOString(),
      days_remaining: daysRemaining,
      logo_url: sub.logoUrl,
    };
  });

  return NextResponse.json(trials);
}
