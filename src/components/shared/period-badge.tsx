import { Badge } from "@/components/ui/badge";
import { getBillingPeriodLabel } from "@/lib/format";

export function PeriodBadge({ period }: { period: string }) {
  return (
    <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0">
      {getBillingPeriodLabel(period)}
    </Badge>
  );
}
