"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { X } from "lucide-react";

import { FormInput } from "@/components/auth/form-input";
import { getInitialRunFormValues, validateRun } from "@/lib/run-log";
import type { RunFormValues } from "@/types/run";

type LogRunModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: RunFormValues) => Promise<void>;
};

export function LogRunModal({ isOpen, isSubmitting, onClose, onSubmit }: LogRunModalProps) {
  const [values, setValues] = useState<RunFormValues>(getInitialRunFormValues());
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateRun(values);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      await onSubmit(values);
      setValues(getInitialRunFormValues());
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save run.");
    }
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    setError(null);
    setValues(getInitialRunFormValues());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <button
        aria-label="Close log run modal"
        className="absolute inset-0"
        onClick={handleClose}
        type="button"
      />

      <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Log Run</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Capture distance, duration, and how your body felt after the session.
            </p>
          </div>
          <button
            className="rounded-full border border-[var(--border)] bg-[var(--card)]/40 p-2 text-[var(--text)] transition hover:bg-[var(--card)]/70"
            onClick={handleClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput
            label="Date"
            name="date"
            onChange={(value) => setValues((current) => ({ ...current, date: value }))}
            type="date"
            value={values.date}
          />

          <div className="grid gap-4 grid-cols-2">
            <FormInput
              label="Distance (km)"
              min={0.1}
              name="distanceKm"
              onChange={(value) => setValues((current) => ({ ...current, distanceKm: value }))}
              placeholder="10.5"
              step={0.1}
              type="number"
              value={values.distanceKm}
            />
            <FormInput
              label="Mood / Fatigue (1-10)"
              max={10}
              min={1}
              name="moodFatigueLevel"
              onChange={(value) => setValues((current) => ({ ...current, moodFatigueLevel: value }))}
              type="number"
              value={values.moodFatigueLevel}
            />
          </div>

          <div className="grid gap-4 grid-cols-2">
            <FormInput
              label="Duration (hours)"
              min={0}
              name="durationHours"
              onChange={(value) => setValues((current) => ({ ...current, durationHours: value }))}
              placeholder="0"
              type="number"
              value={values.durationHours}
            />
            <FormInput
              label="Duration (minutes)"
              min={0}
              name="durationMinutes"
              onChange={(value) => setValues((current) => ({ ...current, durationMinutes: value }))}
              placeholder="45"
              type="number"
              value={values.durationMinutes}
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/75">Notes</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]/70"
              name="notes"
              onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
              placeholder="How did the run feel?"
              value={values.notes}
            />
          </label>

          {error ? (
            <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--text-muted)]">{error}</p>
          ) : null}

          <button
            className="w-full rounded-[1.5rem] bg-orange-400 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Saving run..." : "Save run"}
          </button>
        </form>
      </div>
    </div>
  );
}
