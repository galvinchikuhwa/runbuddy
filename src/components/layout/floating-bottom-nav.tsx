"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/run-log", label: "Run Log", icon: Activity },
  { href: "/coach", label: "Coach", icon: User },
];

function splitHref(href: string) {
  const [path, hash] = href.split("#");
  return { path, hash: hash ? `#${hash}` : "" };
}

export function FloatingBottomNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash || "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const activeStates = useMemo(
    () =>
      navItems.map((item) => {
        const { path, hash } = splitHref(item.href);
        const isPathMatch = pathname === path;
        const isActive = hash ? isPathMatch && currentHash === hash : isPathMatch && !currentHash;
        return isActive;
      }),
    [currentHash, pathname],
  );

  const hiddenPaths = ["/", "/login", "/register"];
  if (hiddenPaths.includes(pathname || "")) {
    return null;
  }

  return (
    <nav aria-label="Bottom navigation" className="fixed bottom-6 left-1/2 z-40 w-[min(385px,48.15%)] -translate-x-1/2">
      <div className="mx-auto flex items-center justify-between rounded-full bg-[var(--primary)]/70 px-4 py-1.5 shadow-lg backdrop-blur border border-[var(--border)]/50">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeStates[index];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-[3.35rem] h-[3.35rem] items-center justify-center rounded-full p-2 transition ${
                isActive
                  ? "bg-[var(--primary-active)] text-[var(--primary-contrast)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface)]"
              }`}
              aria-label={item.label}
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? "text-[var(--primary-contrast)]" : "text-[var(--primary-contrast)]/90"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
