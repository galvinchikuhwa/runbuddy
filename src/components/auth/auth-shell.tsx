import type { ReactNode } from "react";
import Link from "next/link";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  children: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerHref,
  children,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2 text-sm text-[var(--text-muted)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
          {eyebrow}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-sm text-[var(--text-muted)]">
          {footerText}{" "}
          <Link className="text-[var(--primary)] transition hover:text-[var(--primary-active)]" href={footerHref}>
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}
