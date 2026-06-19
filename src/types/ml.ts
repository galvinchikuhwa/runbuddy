export type PerformancePrediction = {
  userId: number;
  predictedPace: string;
  recommendedWeeklyVolumeKm: number;
  confidence: number;
  generatedAt: string;
};
