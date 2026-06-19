"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type StickyPageHeaderProps = {
  title: string;
  description: string;
  statusLabel: string;
  statusText: string;
  actions?: ReactNode;
};

export function StickyPageHeader({ title, description, statusLabel, statusText, actions }: StickyPageHeaderProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { rootMargin: "-1px 0px 0px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const cls = "fade-active";
    if (isSticky) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
    return () => {
      document.body.classList.remove(cls);
    };
  }, [isSticky]);

  return (
    <div className="relative">
      <section ref={cardRef} className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2 text-sm text-[var(--text-muted)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
              <span>{statusLabel}</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base text-[var(--text-muted)] sm:text-lg">{description}</p>
          </div>
          {actions ? <div className="flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
      </section>

      <div
        className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-200 ${
          isSticky
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-6 scale-95"
        }`}
      >
        <div className="mx-auto flex items-center justify-center max-w-[min(900px,96%)] rounded-full border border-[var(--primary-active)]/40 bg-[var(--primary)]/80 px-5 py-3 text-lg font-semibold text-[var(--primary-contrast)] shadow-2xl backdrop-blur whitespace-nowrap">
          {title}
        </div>
      </div>
    </div>
  );
}
