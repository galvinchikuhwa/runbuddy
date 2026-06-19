import type { DistanceFilter, RunApiResponse, RunFormValues } from "@/types/run";

export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getInitialRunFormValues(): RunFormValues {
  return {
    date: getTodayDateString(),
    distanceKm: "",
    durationHours: "",
    durationMinutes: "",
    moodFatigueLevel: "5",
    notes: "",
  };
}

export function durationToSeconds(hours: string, minutes: string): number {
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  return h * 3600 + m * 60;
}

export function validateRun(values: RunFormValues): string | null {
  if (!values.date.trim() || !values.distanceKm.trim() || !values.moodFatigueLevel.trim()) {
    return "Date, distance, and fatigue level are required.";
  }

  if (Number(values.distanceKm) <= 0) {
    return "Distance must be greater than zero.";
  }

  const totalSeconds = durationToSeconds(values.durationHours, values.durationMinutes);
  if (totalSeconds <= 0) {
    return "Duration must be greater than zero.";
  }

  const fatigue = Number(values.moodFatigueLevel);
  if (fatigue < 1 || fatigue > 10) {
    return "Fatigue level must stay between 1 and 10.";
  }

  return null;
}

export function formValuesToPayload(userId: number, values: RunFormValues) {
  return {
    userId,
    date: values.date,
    distanceKm: Number(values.distanceKm),
    durationSeconds: durationToSeconds(values.durationHours, values.durationMinutes),
    moodFatigueLevel: Number(values.moodFatigueLevel),
    notes: values.notes.trim() || undefined,
  };
}

export function matchesDistanceFilter(distanceKm: number, filter: DistanceFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "1-4":
      return distanceKm >= 1 && distanceKm <= 4;
    case "5-9":
      return distanceKm >= 5 && distanceKm <= 9;
    case "10-14":
      return distanceKm >= 10 && distanceKm <= 14;
    case "15-19":
      return distanceKm >= 15 && distanceKm <= 19;
    case "20-25":
      return distanceKm >= 20 && distanceKm <= 25;
    case "25+":
      return distanceKm > 25;
    default:
      return true;
  }
}

export function filterRuns(
  runs: RunApiResponse[],
  search: string,
  distanceFilter: DistanceFilter,
): RunApiResponse[] {
  const query = search.trim().toLowerCase();

  return runs.filter((run) => {
    if (!matchesDistanceFilter(run.distanceKm, distanceFilter)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [run.date, run.notes ?? "", String(run.distanceKm), String(run.moodFatigueLevel)]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getTrainingDaysThisMonth(runs: RunApiResponse[]): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const uniqueDays = new Set(
    runs
      .filter((run) => {
        const date = new Date(`${run.date}T00:00:00`);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .map((run) => run.date),
  );

  return uniqueDays.size;
}
