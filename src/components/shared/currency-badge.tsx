import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const currencyColors: Record<string, string> = {
  TRY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  USD: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  EUR: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

export function CurrencyBadge({ currency }: { currency: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-medium px-1.5 py-0",
        currencyColors[currency] || ""
      )}
    >
      {currency}
    </Badge>
  );
}
