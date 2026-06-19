"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import type { RunApiResponse } from "@/types/run";
import { listRuns } from "@/lib/api";
import { getStoredUser } from "@/lib/session";

interface RunDataContextType {
  runs: RunApiResponse[];
  isLoading: boolean;
  error: string | null;
  refetchRuns: () => Promise<void>;
  setRuns: (runs: RunApiResponse[]) => void;
}

const RunDataContext = createContext<RunDataContextType | undefined>(undefined);

export function RunDataProvider({ children }: { children: ReactNode }) {
  const [runs, setRuns] = useState<RunApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track if a fetch is already in progress to prevent concurrent fetches
  const isFetchingRef = useRef(false);

  const refetchRuns = async () => {
    console.log("[Context] 📡 refetchRuns() called");
    
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      console.log("[Context] ⚠️  Fetch already in progress, skipping");
      return;
    }

    const storedUser = getStoredUser();
    console.log("[Context] 👤 Stored user:", storedUser);
    
    if (!storedUser?.id) {
      console.log("[Context] ❌ No stored user, skipping refetch");
      setIsLoading(false);
      return;
    }

    console.log("[Context] 🚀 Starting API call for user:", storedUser.id);
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("[Context] 📤 Calling listRuns API...");
      const response = await listRuns(storedUser.id, 100);
      console.log("[Context] ✅ API Success! Got", response.items.length, "runs");
      console.log("[Context] Data:", response.items);
      setRuns(response.items);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to load runs";
      console.error("[Context] ❌ API ERROR:", errorMsg);
      console.error("[Context] Full error:", err);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  // Initial fetch on mount only
  useEffect(() => {
    console.log("[Context] Provider mounted, triggering initial fetch");
    void refetchRuns();
    // Empty deps - only run once on mount
  }, []);

  return (
    <RunDataContext.Provider value={{ runs, isLoading, error, refetchRuns, setRuns }}>
      {children}
    </RunDataContext.Provider>
  );
}

export function useRunData() {
  const context = useContext(RunDataContext);
  if (!context) {
    throw new Error("useRunData must be used within RunDataProvider");
  }
  return context;
}
