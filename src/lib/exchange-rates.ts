import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

const TCMB_URL = "https://www.tcmb.gov.tr/kurlar/today.xml";

export async function fetchAndStoreRates(): Promise<Record<string, number>> {
  try {
    const response = await fetch(TCMB_URL, { next: { revalidate: 3600 } });
    const text = await response.text();

    const rates: Record<string, number> = {};

    // Parse USD rate
    const usdMatch = text.match(/<Currency[^>]*Kod="USD"[^>]*>[\s\S]*?<ForexBuying>([\d.]+)<\/ForexBuying>/);
    if (usdMatch) rates["USD"] = parseFloat(usdMatch[1]);

    // Parse EUR rate
    const eurMatch = text.match(/<Currency[^>]*Kod="EUR"[^>]*>[\s\S]*?<ForexBuying>([\d.]+)<\/ForexBuying>/);
    if (eurMatch) rates["EUR"] = parseFloat(eurMatch[1]);

    // Store in database
    const now = new Date();
    for (const [currency, rate] of Object.entries(rates)) {
      await prisma.exchangeRate.create({
        data: {
          baseCurrency: currency,
          targetCurrency: "TRY",
          rate: new Decimal(rate),
          fetchedAt: now,
          source: "TCMB",
        },
      });
    }

    return rates;
  } catch (error) {
    console.error("Failed to fetch TCMB rates:", error);
    return {};
  }
}

export async function getLatestRate(baseCurrency: string): Promise<number> {
  if (baseCurrency === "TRY") return 1;

  const rate = await prisma.exchangeRate.findFirst({
    where: { baseCurrency, targetCurrency: "TRY" },
    orderBy: { fetchedAt: "desc" },
  });

  if (!rate) {
    // Try to fetch fresh rates
    const rates = await fetchAndStoreRates();
    return rates[baseCurrency] || 1;
  }

  // Refresh if older than 1 hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  if (rate.fetchedAt < oneHourAgo) {
    const rates = await fetchAndStoreRates();
    return rates[baseCurrency] || rate.rate.toNumber();
  }

  return rate.rate.toNumber();
}

export function convertToTRY(amount: number, currency: string, rate: number): number {
  if (currency === "TRY") return amount;
  return Math.round(amount * rate * 100) / 100;
}

export function normalizeToMonthly(price: number, period: string): number {
  switch (period) {
    case "yearly":
      return Math.round((price / 12) * 100) / 100;
    case "weekly":
      return Math.round(price * 4.33 * 100) / 100;
    default:
      return price;
  }
}
