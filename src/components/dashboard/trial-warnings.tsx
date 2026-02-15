"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useActiveTrials } from "@/hooks/use-analytics";

export function TrialWarnings() {
  const { data } = useActiveTrials();

  if (!data || data.length === 0) return null;

  const urgentTrials = data.filter((t) => t.days_remaining <= 7);
  if (urgentTrials.length === 0) return null;

  return (
    <div className="space-y-2">
      {urgentTrials.map((trial) => (
        <Alert
          key={trial.subscription_id}
          variant={trial.days_remaining <= 3 ? "destructive" : "default"}
          className="border-border/50"
        >
          {trial.days_remaining <= 3 ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <AlertTitle className="text-sm font-medium">
            {trial.name} deneme süresi bitiyor
          </AlertTitle>
          <AlertDescription className="text-xs">
            {trial.days_remaining === 0
              ? "Deneme süresi bugün sona eriyor!"
              : trial.days_remaining === 1
              ? "Deneme süresi yarın sona eriyor"
              : `${trial.days_remaining} gün kaldı`}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
