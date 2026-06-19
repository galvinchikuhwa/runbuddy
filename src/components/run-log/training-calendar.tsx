"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { getTrainingDaysThisMonth } from "@/lib/run-log";
import type { RunApiResponse } from "@/types/run";

type TrainingCalendarProps = {
  runs: RunApiResponse[];
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function TrainingCalendar({ runs }: TrainingCalendarProps) {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());

  const runDates = useMemo(() => new Set(runs.map((run) => run.date)), [runs]);

  const monthLabel = new Date(visibleYear, visibleMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(visibleYear, visibleMonth, 1).getDay();
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();

  const calendarCells = Array.from({ length: firstDayOfMonth }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, index) => index + 1),
  );

  const trainingDaysThisMonth = getTrainingDaysThisMonth(
    runs.filter((run) => {
      const date = new Date(`${run.date}T00:00:00`);
      return date.getMonth() === visibleMonth && date.getFullYear() === visibleYear;
    }),
  );

  function shiftMonth(direction: -1 | 1) {
    const next = new Date(visibleYear, visibleMonth + direction, 1);
    setVisibleMonth(next.getMonth());
    setVisibleYear(next.getFullYear());
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Training Calendar</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Completed run days are highlighted in orange.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous month"
            className="rounded-full border border-[var(--border)] bg-[var(--card)]/40 p-2 text-[var(--text)] transition hover:bg-[var(--card)]/70"
            onClick={() => shiftMonth(-1)}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next month"
            className="rounded-full border border-[var(--border)] bg-[var(--card)]/40 p-2 text-[var(--text)] transition hover:bg-[var(--card)]/70"
            onClick={() => shiftMonth(1)}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-orange-400">{monthLabel}</p>

      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.18em] text-white/45">
        {weekdayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const dateKey = toDateKey(visibleYear, visibleMonth, day);
          const hasRun = runDates.has(dateKey);
          const isToday =
            today.getDate() === day &&
            today.getMonth() === visibleMonth &&
            today.getFullYear() === visibleYear;

          return (
            <div
              key={dateKey}
                className={`flex h-11 items-center justify-center rounded-2xl text-sm ${
                  hasRun
                    ? "bg-orange-400 font-semibold text-white"
                    : isToday
                      ? "border border-orange-400/40 bg-orange-400/10 text-orange-400"
                      : "bg-[var(--card)]/50 text-[var(--text-muted)]"
                }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/30 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Training Days This Month</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--text)]">{trainingDaysThisMonth}</p>
      </div>
    </div>
  );
}
