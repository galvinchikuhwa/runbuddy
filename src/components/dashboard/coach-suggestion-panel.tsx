"use client";

import { useEffect, useState } from "react";

import { CoachPanel } from "@/components/dashboard/coach-panel";
import { getCoachSuggestion } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { CoachSuggestion } from "@/types/ai";

type CoachSuggestionPanelProps = {
  runCount?: number;
  fallbackSuggestion?: {
    title: string;
    body: string;
    focus: string;
  };
};

export function CoachSuggestionPanel({ runCount = 0, fallbackSuggestion }: CoachSuggestionPanelProps) {
  const [suggestion, setSuggestion] = useState<CoachSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser?.id || runCount === 0) {
      setIsLoading(false);
      return;
    }

    getCoachSuggestion(storedUser.id)
      .then((result) => setSuggestion(result))
      .catch((error) => {
        console.error("Failed to fetch coach suggestion:", error);
      })
      .finally(() => setIsLoading(false));
  }, [runCount]);

  const defaultFallback = {
    title: "AI Coach",
    body: "Log your first run to get personalized coaching insights.",
    focus: "Focus: start with easy consistency",
  };

  const content = isLoading && !suggestion
    ? {
        title: "AI Coach",
        body: "Loading personalized recommendation...",
        focus: "Please wait while the coach reviews your recent runs.",
      }
    : suggestion
    ? {
        title: "AI Coach Suggestion",
        body: suggestion.recommendation,
        focus: suggestion.focus,
      }
    : fallbackSuggestion || defaultFallback;

  return <CoachPanel title={content.title} body={content.body} focus={content.focus} />;
}
