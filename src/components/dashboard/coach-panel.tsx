import { Sparkles } from "lucide-react";

type CoachPanelProps = {
  title: string;
  body: string;
  focus: string;
};

export function CoachPanel({ title, body, focus }: CoachPanelProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-2xl bg-sky-400/15 p-3">
          <Sparkles className="h-5 w-5 text-sky-400" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Coach Insight</p>
          <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">{body}</p>
      <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/40 px-4 py-4 text-sm text-[var(--text-muted)]">
        {focus}
      </div>
    </div>
  );
}
