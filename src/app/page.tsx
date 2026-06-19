import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { FoundationCard } from "@/components/ui/foundation-card";
import { siteConfig } from "@/lib/site";

const frontendFolders = [
  "src/app",
  "src/components/layout",
  "src/components/ui",
  "src/lib",
  "public",
];

const backendFolders = [
  "app/api/routes",
  "app/core",
  "app/db",
  "app/models",
  "app/schemas",
  "app/services/ai",
  "app/services/ml",
  "tests",
];

export default function HomePage() {
  return (
    <AppShell>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10">
        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl backdrop-blur">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2 text-sm text-[var(--text-muted)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
            Phase 5 run logging available
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{siteConfig.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
            The authentication foundation, database layer, and dashboard UI are ready. Run logging
            is now live with activity feed, calendar, and modal entry.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-[1.5rem] bg-[var(--primary)]/80 px-5 py-3 text-sm font-semibold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-active)]/90"
              href="/login"
            >
              Sign In
            </Link>
            <Link
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--card)]/80"
              href="/register"
            >
              Create Account
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FoundationCard title="Frontend Structure">
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              {frontendFolders.map((folder) => (
                <li key={folder} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  {folder}
                </li>
              ))}
            </ul>
          </FoundationCard>

          <FoundationCard title="Backend Structure">
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              {backendFolders.map((folder) => (
                <li key={folder} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  {folder}
                </li>
              ))}
            </ul>
          </FoundationCard>
        </section>
      </main>
    </AppShell>
  );
}
