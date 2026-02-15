import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const currencyColors: Record<string, string> = {
  TRY: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 backdrop-blur-sm shadow-[0_0_10px_oklch(0.7_0.18_150_/_0.3)]",
  USD: "bg-blue-500/20 text-blue-400 border-blue-500/40 backdrop-blur-sm shadow-[0_0_10px_oklch(0.7_0.18_230_/_0.3)]",
  EUR: "bg-purple-500/20 text-purple-400 border-purple-500/40 backdrop-blur-sm shadow-[0_0_10px_oklch(0.65_0.22_295_/_0.3)]",
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
