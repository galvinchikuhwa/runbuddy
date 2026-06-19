type SummaryPanelProps = {
  title: string;
  subtitle: string;
  items: Array<{
    label: string;
    value: string;
  }>;
  disabled?: boolean;
};

export function SummaryPanel({ title, subtitle, items, disabled = false }: SummaryPanelProps) {
  return (
    <div className={`rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 ${disabled ? "opacity-60" : ""}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/60 px-4 py-3"
          >
            <span className="text-sm text-[var(--text-muted)]">{item.label}</span>
            <span className="text-sm font-semibold text-[var(--text)]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
