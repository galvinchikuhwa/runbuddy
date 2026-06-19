import type { CoachSuggestion } from "@/types/ai";

export function mapCoachSuggestion(response: CoachSuggestion) {
  return {
    userId: response.userId,
    recommendation: response.recommendation,
    focus: response.focus,
    generatedAt: response.generatedAt,
  };
}
