"use client";

import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ActivityFeed } from "@/components/run-log/activity-feed";
import { LogRunModal } from "@/components/run-log/log-run-modal";
import { RunLogFab } from "@/components/run-log/run-log-fab";
import { StickyPageHeader } from "@/components/layout/sticky-page-header";
import { TrainingCalendar } from "@/components/run-log/training-calendar";
import { createRun, deleteRun } from "@/lib/api";
import { filterRuns, formValuesToPayload } from "@/lib/run-log";
import { getStoredUser } from "@/lib/session";
import { useRunData } from "@/lib/run-context";
import type { DistanceFilter, RunFormValues } from "@/types/run";

export default function RunLogPage() {
  const { runs, isLoading, error, refetchRuns } = useRunData();
  const [search, setSearch] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("all");
  const [actionError, setActionError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  const filteredRuns = useMemo(
    () => filterRuns(runs, search, distanceFilter),
    [distanceFilter, runs, search],
  );

  async function handleCreateRun(values: RunFormValues) {
    const storedUser = getStoredUser();
    if (!storedUser?.id) {
      return;
    }

    setIsSubmitting(true);
    setActionError(null);
    try {
      console.log("[RunLog] Creating run...");
      await createRun(formValuesToPayload(storedUser.id, values));
      console.log("[RunLog] ✓ Run created, waiting 1s for cache invalidation...");
      
      // Wait for backend cache invalidation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("[RunLog] Now refetching runs...");
      await refetchRuns();
      console.log("[RunLog] ✓ Refetch complete");
      
      setIsModalOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to log run.";
      console.error("[RunLog] ✗ Create failed:", msg);
      setActionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }  async function handleDeleteRun(runId: number) {
    const storedUser = getStoredUser();
    if (!storedUser?.id) {
      return;
    }

    setIsDeletingId(runId);
    setActionError(null);
    try {
      console.log("[RunLog] Deleting run", runId);
      await deleteRun(runId, storedUser.id);
      console.log("[RunLog] ✓ Run deleted, waiting 500ms for cache invalidation...");
      
      // Wait for backend cache invalidation
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      console.log("[RunLog] Now refetching runs...");
      await refetchRuns();
      console.log("[RunLog] ✓ Refetch complete");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to delete run.";
      console.error("[RunLog] ✗ Delete failed:", msg);
      setActionError(msg);
    } finally {
      setIsDeletingId(null);
    }
  }


  return (
    <DashboardShell>
      <main className="scroll-fade-bottom flex min-h-screen flex-col gap-6 py-2">
        <StickyPageHeader
          title="Run Log"
          description="Review every session, filter by distance, and log new workouts from the floating action button."
          statusLabel="Phase 5 run logging ready"
          statusText="Run Log"
        />

        {error ? (
          <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--text-muted)]">{error}</p>
        ) : null}
        {actionError ? (
          <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--text-muted)]">{actionError}</p>
        ) : null}

        {isLoading ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center text-sm text-[var(--text-muted)]">
            Loading your activity feed...
          </div>
        ) : (
          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
            <ActivityFeed
              distanceFilter={distanceFilter}
              isDeletingId={isDeletingId}
              onDelete={handleDeleteRun}
              onDistanceFilterChange={setDistanceFilter}
              onSearchChange={setSearch}
              runs={filteredRuns}
              search={search}
            />
            <TrainingCalendar runs={runs} />
          </section>
        )}
      </main>

      <RunLogFab onClick={() => setIsModalOpen(true)} />

      <LogRunModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRun}
      />
    </DashboardShell>
  );
}
