"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, MessageCircle, Rocket, Target, X } from "lucide-react";
import { motion } from "framer-motion";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StickyPageHeader } from "@/components/layout/sticky-page-header";

const distanceOptions = [5, 10, 15, 21, 30, 42];

type Message = {
  role: "user" | "assistant";
  text: string;
};

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export default function CoachPage() {
  const [targetDistance, setTargetDistance] = useState(21);
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to Coach Buddy. Tell me your training goal and I’ll help you optimize pace, milestones, and recovery.",
    },
  ]);

  const predictedTime = useMemo(() => {
    const basePaceSeconds = 300; // 5:00/km
    const fatigueFactor = 1 + targetDistance / 120;
    return formatDuration(targetDistance * basePaceSeconds * fatigueFactor);
  }, [targetDistance]);

  const milestoneData = useMemo(() => {
    const weeklyVolume = targetDistance * 3;
    const consistencyScore = Math.min(100, 80 + targetDistance / 2);
    const enduranceGoal = Math.max(1, Math.round(targetDistance * 0.18));

    return {
      weeklyVolume,
      consistencyScore,
      enduranceGoal,
    };
  }, [targetDistance]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    const userMessage: Message = { role: "user", text: inputValue.trim() };
    const assistantMessage: Message = {
      role: "assistant",
      text: `I hear you. Based on your current target of ${targetDistance} km, I recommend pacing around 5:00/km with a sustainable finish time near ${predictedTime}. Keep your weekly volume at ${milestoneData.weeklyVolume} km and gradually build a recovery routine.`,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInputValue("");
  }

  return (
    <DashboardShell>
      <main className="scroll-fade-bottom flex min-h-screen flex-col gap-6 py-2 pb-28">
        <StickyPageHeader
          title="Coach Buddy"
          description="Review predictive training guidance, explore milestone analytics, and chat with your coaching assistant from the same run-log style dashboard layout."
          statusLabel="Phase 5 coaching hub ready"
          statusText="Coach Buddy"
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">ML Predictive Pacing</p>
                  <h2 className="mt-3 text-2xl font-semibold">Target distance analysis</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card)]/80 px-3 py-2 text-sm text-[var(--text-muted)]">
                  <Target className="h-4 w-4 text-sky-400" />
                  {targetDistance} km goal
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/50 px-5 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[var(--text-muted)]">Slide to choose your next target distance.</p>
                    <span className="rounded-full bg-[var(--primary)]/15 px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                      {targetDistance} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={42}
                    step={1}
                    value={targetDistance}
                    onChange={(event) => setTargetDistance(Number(event.target.value))}
                    className="mt-6 w-full accent-[var(--primary)]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4 text-center">
                    <p className="text-sm text-[var(--text-muted)]">Projected finish</p>
                    <p className="mt-3 text-2xl font-semibold text-[var(--text)]">{predictedTime}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4 text-center">
                    <p className="text-sm text-[var(--text-muted)]">Average pace</p>
                    <p className="mt-3 text-2xl font-semibold text-[var(--primary)]">5:00/km</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4 text-center">
                    <p className="text-sm text-[var(--text-muted)]">Consistency index</p>
                    <p className="mt-3 text-2xl font-semibold text-[var(--text)]">
                      {milestoneData.consistencyScore}%
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Logic Engine</p>
                  <h2 className="mt-3 text-2xl font-semibold">Adaptive recommendation stream</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-3 py-2 text-sm font-semibold text-sky-400">
                  <Activity className="h-4 w-4 text-sky-400" />
                  Live inference
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
                The coaching engine blends your historical fatigue profile with weekly volume and target distance to generate the most realistic pace recommendation. This is a frontend prototype; backend model wiring can be added later.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-sm text-[var(--text-muted)]">Recommended recovery</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--text)]">2 days active rest</p>
                </div>
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="text-sm text-[var(--text-muted)]">Performance gain</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--text)]">+8% over 4 weeks</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Milestone Metrics</p>
                  <h2 className="mt-3 text-2xl font-semibold">Verified endurance goals</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-3 py-2 text-sm font-semibold text-sky-400">
                  <ArrowRight className="h-4 w-4 text-sky-400" />
                  Maintain consistency
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/50 p-4">
                  <p className="text-sm text-[var(--text-muted)]">Weekly volume</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--text)]">{milestoneData.weeklyVolume} km</p>
                </div>
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/50 p-4">
                  <p className="text-sm text-[var(--text-muted)]">Endurance rating</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--primary)]">{milestoneData.enduranceGoal}/10</p>
                </div>
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/50 p-4">
                  <p className="text-sm text-[var(--text-muted)]">Training goal</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--text)]">Sustain pace</p>
                </div>
              </div>
            </section>
          </div>

          <section className="flex min-h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Conversational interface</p>
                <h2 className="mt-2 text-2xl font-semibold">Coach Buddy Chat</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-3 py-2 text-sm font-semibold text-sky-400">
                <MessageCircle className="h-4 w-4 text-sky-400" />
                Live session
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-[1.75rem] p-4 shadow-sm ${
                      message.role === "assistant"
                        ? "bg-sky-400/10 text-sky-100"
                        : "bg-[var(--primary)]/10 text-[var(--text)] self-end"
                    }`}
                  >
                    <p className="text-sm leading-7">{message.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

      <motion.button
        type="button"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open coach chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-[1.5em] right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-contrast)] shadow-[0_20px_60px_rgba(58,57,62,0.35)]"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>

      {isChatOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <button
            aria-label="Close coach chat modal"
            className="absolute inset-0"
            onClick={() => setIsChatOpen(false)}
            type="button"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Coach Buddy Chat</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Ask for pacing advice, milestone adjustments, or training recovery guidance.
                </p>
              </div>
              <button
                className="rounded-full border border-[var(--border)] bg-[var(--card)]/40 p-2 text-[var(--text)] transition hover:bg-[var(--card)]/70"
                onClick={() => setIsChatOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[60vh] flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="mb-4 rounded-[1.75rem] bg-[var(--card)] p-4 text-sm text-[var(--text-muted)]">
                <p>Conversation history is live. Your coaching assistant is ready when you are.</p>
              </div>

              <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-2">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[90%] rounded-[1.75rem] p-4 shadow-sm ${
                      message.role === "assistant"
                        ? "bg-sky-400/10 text-sky-100"
                        : "ml-auto bg-[var(--primary)]/10 text-[var(--text)]"
                    }`}
                  >
                    <p className="text-sm leading-7">{message.text}</p>
                  </div>
                ))}
              </div>

              <form className="mt-4 flex gap-3" onSubmit={handleSubmit}>
                <textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Type your question..."
                  className="min-h-[4rem] flex-1 resize-none rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]/70"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-[1.5rem] bg-sky-400 text-white transition hover:bg-sky-500"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      </main>
    </DashboardShell>
  );
}
