export type RunFormValues = {
  date: string;
  distanceKm: string;
  durationHours: string;
  durationMinutes: string;
  moodFatigueLevel: string;
  notes: string;
};

export type DistanceFilter =
  | "all"
  | "1-4"
  | "5-9"
  | "10-14"
  | "15-19"
  | "20-25"
  | "25+";

export type RunApiPayload = {
  userId: number;
  date: string;
  distanceKm: number;
  durationSeconds: number;
  moodFatigueLevel: number;
  notes?: string;
};

export type RunApiResponse = {
  id: number;
  userId: number;
  date: string;
  distanceKm: number;
  durationSeconds: number;
  moodFatigueLevel: number;
  notes?: string | null;
  createdAt: string;
};

export type RunListApiResponse = {
  items: RunApiResponse[];
  count: number;
};
