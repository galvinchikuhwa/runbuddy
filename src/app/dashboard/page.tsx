"use client";

import { useState } from "react";
import Link from "next/link";
import { Route, Gauge, Flame, Trophy } from "lucide-react";

import { CoachSuggestionPanel } from "@/components/dashboard/coach-suggestion-panel";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MlForecastPanel } from "@/components/dashboard/ml-forecast-panel";
import { RecentRunsTable } from "@/components/dashboard/recent-runs-table";
import { SummaryPanel } from "@/components/dashboard/summary-panel";
import { WeeklyChart } from "@/components/dashboard/weekly-chart";
import { StickyPageHeader } from "@/components/layout/sticky-page-header";
import { useRunData } from "@/lib/run-context";
import type { RunApiResponse } from "@/types/run";

export default function DashboardPage() {
  const { runs, isLoading, refetchRuns } = useRunData();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    console.log("[Dashboard] Manual refresh triggered");
    setIsRefreshing(true);
    try {
      await refetchRuns();
      console.log("[Dashboard] ✓ Refresh complete");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("[Dashboard] ✗ Refresh failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Calculate stats from real data
  const thisWeekDistance = runs
    .filter((run) => {
      const runDate = new Date(run.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return runDate > weekAgo;
    })
    .reduce((sum, run) => sum + run.distanceKm, 0);

  const avgPace =
    runs.length > 0
      ? runs
          .slice(0, 6)
          .reduce((sum, run) => sum + run.durationSeconds / run.distanceKm, 0) /
        Math.min(runs.length, 6)
      : 0;
  const avgPaceMinutes = Math.floor(avgPace / 60);
  const avgPaceSeconds = Math.floor(avgPace % 60);

  const consistencyDays = new Set(runs.map((run) => run.date)).size;

  const dashboardStats = [
    {
      title: "This Week",
      value: `${thisWeekDistance.toFixed(1)} km`,
      change: runs.length === 0 ? "No runs yet" : `${runs.length} recent runs`,
      icon: Route,
    },
    {
      title: "Avg Pace",
      value: runs.length === 0 ? "—" : `${avgPaceMinutes}:${avgPaceSeconds.toString().padStart(2, "0")} /km`,
      change: runs.length === 0 ? "Log runs to calculate" : `Across ${Math.min(runs.length, 6)} runs`,
      icon: Gauge,
    },
    {
      title: "Consistency",
      value: `${consistencyDays} days`,
      change: runs.length === 0 ? "Start your first run" : "Current tracking",
      icon: Flame,
    },
    {
      title: "Goal Progress",
      value: runs.length < 3 ? "—" : `${Math.min(100, Math.round((runs.length / 10) * 100))}%`,
      change: runs.length < 3 ? "Log 3+ runs to track" : "Toward training goals",
      icon: Trophy,
    },
  ];

  const recentRunsForTable = runs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((run) => ({
      id: run.id,
      date: new Date(run.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      workout: "Run",
      distance: `${run.distanceKm.toFixed(1)} km`,
      pace: `${Math.floor(run.durationSeconds / run.distanceKm / 60)}:${Math.floor((run.durationSeconds / run.distanceKm) % 60)
        .toString()
        .padStart(2, "0")} /km`,
      fatigue: `${run.moodFatigueLevel}/10`,
    }));

  const weeklyTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayDistance = runs
      .filter((run) => run.date === dateStr)
      .reduce((sum, run) => sum + run.distanceKm, 0);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }).substring(0, 3),
      distance: dayDistance,
      fatigue: runs.find((run) => run.date === dateStr)?.moodFatigueLevel || 0,
    };
  });

  return (
    <DashboardShell>
      <main className="scroll-fade-bottom flex min-h-screen flex-col gap-6 py-2">
        <StickyPageHeader
          title="Your performance overview"
          description="Track your training rhythm, review recent sessions, and preview the AI coaching layer that will become interactive in later phases."
          statusLabel={runs.length === 0 ? "Welcome - ready to log runs" : "Dashboard live"}
          statusText={runs.length === 0 ? "Get started" : "Dashboard"}
          actions={
            <>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--card)]/80 disabled:opacity-50"
              >
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
              <Link
                className="rounded-[1.5rem] bg-[var(--primary)]/80 px-5 py-3 text-sm font-semibold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-active)]/90"
                href="/run-log"
              >
                Log next run
              </Link>
              <Link
                className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--card)]/80"
                href="/"
              >
                Back home
              </Link>
            </>
          }
        />

        {isLoading ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center text-sm text-[var(--text-muted)]">
            Loading your dashboard...
          </div>
        ) : runs.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              No runs logged yet. Head to the Run Log to start tracking your workouts!
            </p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <MetricCard
                  key={stat.title}
                  change={stat.change}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                />
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Weekly Distance Trend</h2>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">Your training volume this week.</p>
                  </div>
                  <p className="text-sm text-emerald-400">{thisWeekDistance.toFixed(1)} km total</p>
                </div>
                <div className="mt-6">
                  <WeeklyChart data={weeklyTrendData} />
                </div>
              </div>

              <div id="phase-6">
                <CoachSuggestionPanel key={refreshKey} runCount={runs.length} />
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
              {recentRunsForTable.length > 0 ? (
                <RecentRunsTable rows={recentRunsForTable} />
              ) : (
                <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center text-sm text-[var(--text-muted)]">
                  No recent runs to display.
                </div>
              )}

              <div className="grid gap-6">
                {runs.length >= 3 ? (
                  <MlForecastPanel key={refreshKey} runCount={runs.length} />
                ) : (
                  <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-6 text-center">
                    <p className="text-sm text-[var(--text-muted)]">Log at least 3 runs to unlock ML predictions</p>
                  </div>
                )}
                <SummaryPanel
                  items={
                    runs.length === 0
                      ? [
                          { label: "Total runs", value: "0" },
                          { label: "Total distance", value: "0 km" },
                          { label: "Avg runs/week", value: "—" },
                        ]
                      : [
                          { label: "Total runs", value: String(runs.length) },
                          {
                            label: "Total distance",
                            value: `${runs.reduce((sum, run) => sum + run.distanceKm, 0).toFixed(1)} km`,
                          },
                          {
                            label: "Avg runs/week",
                            value: `${(runs.length / Math.max(1, consistencyDays / 7)).toFixed(1)}`,
                          },
                        ]
                  }
                  subtitle="Milestones that frame your broader running history."
                  title="Lifetime Summary"
                />
              </div>
            </section>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
