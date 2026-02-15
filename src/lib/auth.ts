import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getAuthUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { user: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  let user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    // Auto-create user on first API call
    user = await prisma.user.create({
      data: {
        clerkId,
        email: `${clerkId}@clerk.user`,
      },
    });
  }

  return { user, error: null };
}
