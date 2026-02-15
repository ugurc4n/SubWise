import { Badge } from "@/components/ui/badge";
import { getBillingPeriodLabel } from "@/lib/format";

export function PeriodBadge({ period }: { period: string }) {
  return (
    <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0 backdrop-blur-sm border border-cyan-500/20 shadow-[0_0_8px_oklch(0.8_0.15_195_/_0.2)]">
      {getBillingPeriodLabel(period)}
    </Badge>
  );
}
