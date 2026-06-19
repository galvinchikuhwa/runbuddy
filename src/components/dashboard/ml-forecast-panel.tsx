"use client";

import { useEffect, useState } from "react";

import { SummaryPanel } from "@/components/dashboard/summary-panel";
import { getPerformancePrediction } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { PerformancePrediction } from "@/types/ml";

type MlForecastPanelProps = {
  runCount?: number;
  fallbackItems?: Array<{ label: string; value: string }>;
};

export function MlForecastPanel({ runCount = 0, fallbackItems }: MlForecastPanelProps) {
  const [prediction, setPrediction] = useState<PerformancePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser?.id || runCount < 3) {
      setIsLoading(false);
      setPrediction(null);
      return;
    }

    getPerformancePrediction(storedUser.id)
      .then((result) => setPrediction(result))
      .catch(() => {
        // Keep fallback items if API fails.
      })
      .finally(() => setIsLoading(false));
  }, [runCount]);

  const defaultFallback = [
    { label: "Predicted next pace", value: "—" },
    { label: "Recommended weekly volume", value: "—" },
    { label: "Model confidence", value: "—" },
  ];

  const items = prediction
    ? [
        {
          label: "Predicted next pace",
          value: prediction.predictedPace,
        },
        {
          label: "Recommended weekly volume",
          value: `${prediction.recommendedWeeklyVolumeKm.toFixed(0)} km`,
        },
        {
          label: "Model confidence",
          value: `${Math.round(prediction.confidence * 100)}%`,
        },
      ]
    : isLoading
    ? [
        { label: "Predicted next pace", value: "Loading..." },
        { label: "Recommended weekly volume", value: "Loading..." },
        { label: "Model confidence", value: "Loading..." },
      ]
    : fallbackItems || defaultFallback;

  return (
    <SummaryPanel
      items={items}
      subtitle={runCount < 3 ? "Need 3+ runs for predictions" : "Real-time prediction from your recent training history."}
      title="Performance forecast"
      disabled={runCount < 3}
    />
  );
}
