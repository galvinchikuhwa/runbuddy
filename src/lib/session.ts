import type { AuthApiResponse } from "@/types/auth";

const storageKey = "run-buddy-user";

export type StoredUser = NonNullable<AuthApiResponse["user"]>;

export function saveStoredUser(user: StoredUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(user));
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredUser;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
}
