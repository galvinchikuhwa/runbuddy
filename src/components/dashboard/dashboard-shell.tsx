import type { ReactNode } from "react";
import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { dashboardNavItems, overviewHighlights } from "@/lib/dashboard";
import { siteConfig } from "@/lib/site";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <AppShell>
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur lg:block">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--primary)]">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Runner Dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            Your training command center for consistency, coaching, and upcoming race readiness.
          </p>

          <nav className="mt-8 space-y-3">
            {dashboardNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  className="flex items-center gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/60 px-4 py-3 text-sm text-[var(--text)] transition hover:border-[var(--primary)]/30 hover:bg-[var(--card)]/80 hover:text-[var(--text)]"
                  href={item.href}
                >
                  <Icon className="h-4 w-4 text-[var(--primary)]" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/60 p-4">
            {overviewHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="rounded-xl bg-[var(--primary)]/10 p-2">
                    <Icon className="h-4 w-4 text-[var(--primary)]" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.label}</p>
                    <p className="mt-1 text-sm text-[var(--text)]">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex-1">{children}</div>
      </div>
    </AppShell>
  );
}
