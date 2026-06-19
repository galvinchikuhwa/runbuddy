import type { AuthApiPayload, AuthApiResponse } from "@/types/auth";
import type { RunApiPayload, RunApiResponse, RunListApiResponse } from "@/types/run";
import type { CoachSuggestion } from "@/types/ai";
import type { PerformancePrediction } from "@/types/ml";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

async function postJson<TResponse, TPayload>(path: string, payload: TPayload): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as TResponse | { detail?: string };

  if (!response.ok) {
    const errorDetail = typeof data === "object" && data !== null && "detail" in data ? (data as { detail?: string }).detail : "Request failed.";
    throw new Error(errorDetail || "Request failed.");
  }

  return data as TResponse;
}

async function getJson<TResponse>(path: string): Promise<TResponse> {
  console.log("[API] 📨 GET request to:", `${apiBaseUrl}${path}`);
  
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[API] 📬 Response status:", response.status);
    
    if (!response.ok) {
      const data = (await response.json()) as { detail?: string };
      const errorDetail = typeof data === "object" && data !== null && "detail" in data ? (data as { detail?: string }).detail : `HTTP ${response.status}`;
      console.error("[API] ❌ Response not OK:", data);
      throw new Error(errorDetail || `HTTP ${response.status}`);
    }
    
    const data = (await response.json()) as TResponse;
    console.log("[API] ✅ Response OK, data received");
    return data;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    console.error("[API] ❌ FETCH ERROR:", errorMsg, "| URL:", `${apiBaseUrl}${path}`);
    throw err;
  }
}

export function registerProfile(payload: AuthApiPayload) {
  return postJson<AuthApiResponse, AuthApiPayload>("/api/v1/register", payload);
}

export function loginProfile(payload: AuthApiPayload) {
  return postJson<AuthApiResponse, AuthApiPayload>("/api/v1/login", payload);
}

export function createRun(payload: RunApiPayload) {
  return postJson<RunApiResponse, RunApiPayload>("/api/v1/runs", payload);
}

export function listRuns(userId: number, limit = 20) {
  const searchParams = new URLSearchParams({
    userId: String(userId),
    limit: String(limit),
  });

  return getJson<RunListApiResponse>(`/api/v1/runs?${searchParams.toString()}`);
}

export function deleteRun(runId: number, userId: number) {
  const searchParams = new URLSearchParams({
    userId: String(userId),
  });

  return fetch(`${apiBaseUrl}/api/v1/runs/${runId}?${searchParams.toString()}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (!response.ok) {
      const data = (await response.json()) as { detail?: string };
      throw new Error(data.detail ?? "Request failed.");
    }
  });
}

export function getCoachSuggestion(userId: number) {
  const searchParams = new URLSearchParams({
    userId: String(userId),
  });

  return getJson<CoachSuggestion>(`/api/v1/ai/coach?${searchParams.toString()}`);
}

export function getPerformancePrediction(userId: number) {
  const searchParams = new URLSearchParams({
    userId: String(userId),
  });

  return getJson<PerformancePrediction>(`/api/v1/ml/prediction?${searchParams.toString()}`);
}
