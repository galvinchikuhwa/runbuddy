import type { ReactNode } from "react";

type FoundationCardProps = {
  title: string;
  children: ReactNode;
};

export function FoundationCard({ title, children }: FoundationCardProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 text-[var(--text-muted)]">{children}</div>
    </div>
  );
}
