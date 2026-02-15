"use client";

import { MoreHorizontal, Pencil, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceIcon } from "@/components/shared/service-icon";
import { CurrencyBadge } from "@/components/shared/currency-badge";
import { PeriodBadge } from "@/components/shared/period-badge";
import { formatCurrency, formatShortDate } from "@/lib/format";
import type { Subscription } from "@/types/subscription";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (subscription: Subscription) => void;
}

export function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) {
  const {
    name,
    price,
    currency,
    price_in_try,
    billing_period,
    category,
    next_billing_date,
    is_free_trial,
    free_trial_days_remaining,
    logo_url,
    url,
  } = subscription;

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-cyan-500/20 bg-card backdrop-blur-xl p-4 transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_20px_oklch(0.7_0.25_340_/_0.3)] hover:scale-[1.01]">
      <ServiceIcon name={name} logoUrl={logo_url} size="lg" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{name}</h3>
          {category && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
              style={{
                borderColor: category.color || undefined,
                color: category.color || undefined,
              }}
            >
              {category.name}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <PeriodBadge period={billing_period} />
          <CurrencyBadge currency={currency} />
          <span>· Sonraki: {formatShortDate(next_billing_date)}</span>
        </div>
        {is_free_trial && free_trial_days_remaining !== null && (
          <div className="mt-1">
            <Badge
              variant={free_trial_days_remaining <= 3 ? "destructive" : "secondary"}
              className="text-[10px] px-1.5 py-0"
            >
              Deneme: {free_trial_days_remaining} gün kaldı
            </Badge>
          </div>
        )}
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {formatCurrency(price, currency)}
        </p>
        {currency !== "TRY" && price_in_try && (
          <p className="text-xs text-muted-foreground">
            {formatCurrency(price_in_try)}
          </p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(subscription)}>
            <Pencil className="h-4 w-4 mr-2" />
            Düzenle
          </DropdownMenuItem>
          {url && (
            <DropdownMenuItem asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Siteye Git
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:shadow-[0_0_15px_oklch(0.7_0.22_355_/_0.4)]"
            onClick={() => onDelete(subscription)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
