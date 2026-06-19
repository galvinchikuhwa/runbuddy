import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

const iconColorClass = (title: string) => {
  switch (title) {
    case "This Week":
      return "text-emerald-400";
    case "Avg Pace":
      return "text-rose-400";
    case "Consistency":
      return "text-orange-400";
    case "Goal Progress":
      return "text-sky-400";
    default:
      return "text-[var(--primary)]";
  }
};

export function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--text-muted)]">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className="rounded-2xl bg-[var(--primary)]/15 p-3">
          <Icon className={`h-5 w-5 ${iconColorClass(title)}`} />
        </span>
      </div>
      <p className="mt-4 text-sm text-[var(--text-muted)]">{change}</p>
    </div>
  );
}
