"use client";

import { Trash2 } from "lucide-react";

import { formatDateLabel, formatDistance, formatDuration, formatPace } from "@/lib/run-format";
import type { DistanceFilter, RunApiResponse } from "@/types/run";

const distanceFilters: Array<{ label: string; value: DistanceFilter }> = [
  { label: "All", value: "all" },
  { label: "1-4 km", value: "1-4" },
  { label: "5-9 km", value: "5-9" },
  { label: "10-14 km", value: "10-14" },
  { label: "15-19 km", value: "15-19" },
  { label: "20-25 km", value: "20-25" },
  { label: "25+ km", value: "25+" },
];

type ActivityFeedProps = {
  runs: RunApiResponse[];
  search: string;
  distanceFilter: DistanceFilter;
  isDeletingId: number | null;
  onSearchChange: (value: string) => void;
  onDistanceFilterChange: (value: DistanceFilter) => void;
  onDelete: (runId: number) => void;
};

export function ActivityFeed({
  runs,
  search,
  distanceFilter,
  isDeletingId,
  onSearchChange,
  onDistanceFilterChange,
  onDelete,
}: ActivityFeedProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)]">
      <div className="border-b border-white/8 px-6 py-5">
        <h2 className="text-xl font-semibold">Activity Feed</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Search your history and filter by distance to review training patterns.
        </p>
      </div>

      <div className="space-y-4 border-b border-[var(--border)] px-6 py-5">
        <input
          className="w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]/70"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by date, distance, mood, or notes"
          value={search}
        />

        <div className="flex flex-wrap gap-2">
          {distanceFilters.map((filter) => (
            <button
              key={filter.value}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                distanceFilter === filter.value
                  ? "bg-[var(--primary)] text-[var(--primary-contrast)]"
                  : "border border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--card)]/80"
              }`}
              onClick={() => onDistanceFilterChange(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto divide-y divide-white/6">
        {runs.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-white/55">
            No runs match your filters yet. Tap the plus button to log your first session.
          </div>
        ) : (
          runs.map((run) => (
            <article key={run.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-orange-400">{formatDateLabel(run.date)}</p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--text)]">{formatDistance(run.distanceKm)}</h3>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                  <span>{formatDuration(run.durationSeconds)}</span>
                  <span>{formatPace(run.distanceKm, run.durationSeconds)}</span>
                  <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400">
                    Fatigue {run.moodFatigueLevel}/10
                  </span>
                </div>
                {run.notes ? <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)]">{run.notes}</p> : null}
              </div>

              <button
                className="inline-flex items-center gap-2 self-start rounded-[1.25rem] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 hover:text-[var(--text)] disabled:opacity-60"
                disabled={isDeletingId === run.id}
                onClick={() => onDelete(run.id)}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
                {isDeletingId === run.id ? "Deleting..." : "Delete"}
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
