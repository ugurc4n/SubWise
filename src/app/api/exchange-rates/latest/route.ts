import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchAndStoreRates } from "@/lib/exchange-rates";

export async function GET() {
  const rates = [];

  for (const currency of ["USD", "EUR"]) {
    let rate = await prisma.exchangeRate.findFirst({
      where: { baseCurrency: currency, targetCurrency: "TRY" },
      orderBy: { fetchedAt: "desc" },
    });

    // If no rates, try to fetch
    if (!rate) {
      await fetchAndStoreRates();
      rate = await prisma.exchangeRate.findFirst({
        where: { baseCurrency: currency, targetCurrency: "TRY" },
        orderBy: { fetchedAt: "desc" },
      });
    }

    if (rate) {
      rates.push({
        base_currency: rate.baseCurrency,
        target_currency: rate.targetCurrency,
        rate: rate.rate.toNumber(),
        fetched_at: rate.fetchedAt.toISOString(),
      });
    }
  }

  return NextResponse.json({ rates });
}
