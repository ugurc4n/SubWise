import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json({
    items: categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      color: c.color,
    })),
  });
}
