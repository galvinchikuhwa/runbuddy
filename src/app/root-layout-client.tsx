"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import { FloatingBottomNav } from "@/components/layout/floating-bottom-nav";
import { RunDataProvider, useRunData } from "@/lib/run-context";

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { refetchRuns } = useRunData();
  const prevPathnameRef = useRef<string | null>(null);

  // Memoize refetch to avoid dependency issues
  const memoizedRefetch = useCallback(() => {
    console.log("[Layout] 🔄 REFETCH TRIGGERED");
    void refetchRuns();
  }, [refetchRuns]);

  // AGGRESSIVE DEBUG: Log every time pathname changes
  useEffect(() => {
    console.log(`[Layout] 📍 PATHNAME CHANGED TO: ${pathname}`);
  }, [pathname]);

  // Route change detection with refetch
  useEffect(() => {
    if (prevPathnameRef.current === null) {
      console.log("[Layout] 🚀 Initial mount, pathname:", pathname);
      prevPathnameRef.current = pathname;
      return;
    }

    if (pathname !== prevPathnameRef.current) {
      console.log(`[Layout] 🔀 ROUTE CHANGE: ${prevPathnameRef.current} → ${pathname}`);
      prevPathnameRef.current = pathname;
      
      const isAuthRoute = ["", "/", "/login", "/register"].includes(pathname);
      if (!isAuthRoute) {
        console.log("[Layout] ✅ Calling refetchRuns()");
        memoizedRefetch();
      } else {
        console.log("[Layout] ⏭️  Auth route, skipping refetch");
      }
    }
  }, [pathname, memoizedRefetch]);

  return (
    <>
      {children}
      <FloatingBottomNav />
    </>
  );
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <RunDataProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </RunDataProvider>
  );
}
