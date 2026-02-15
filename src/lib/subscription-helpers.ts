import { addWeeks, addMonths, addYears, isAfter } from "date-fns";

export function computeNextBillingDate(startDate: Date, billingPeriod: string): Date {
  const now = new Date();
  let current = new Date(startDate);

  const advanceFn =
    billingPeriod === "weekly"
      ? addWeeks
      : billingPeriod === "yearly"
      ? addYears
      : addMonths;

  while (!isAfter(current, now)) {
    current = advanceFn(current, 1);
  }

  return current;
}
