"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import { loginProfile } from "@/lib/api";
import { validateLogin } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { saveStoredUser } from "@/lib/session";
import type { LoginFormValues } from "@/types/auth";

import { FormInput } from "./form-input";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateLogin(values);
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const credential = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        values.email,
        values.password,
      );
      const response = await loginProfile({
        email: values.email,
        password: values.password,
        firebaseUid: credential.user.uid,
      });

      if (response.user?.id) {
        saveStoredUser(response.user as { id: number; email: string; username?: string });
      }

      setSuccess(response.message);
      router.push("/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        name="email"
        onChange={(value) => setValues((current) => ({ ...current, email: value }))}
        placeholder="you@example.com"
        type="email"
        value={values.email}
      />
      <FormInput
        label="Password"
        name="password"
        onChange={(value) => setValues((current) => ({ ...current, password: value }))}
        placeholder="Minimum 8 characters"
        type="password"
        value={values.password}
      />

      {error ? <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--text-muted)]">{error}</p> : null}
      {success ? (
        <p className="rounded-2xl bg-[var(--primary)]/10 px-4 py-3 text-sm text-[var(--primary)]">{success}</p>
      ) : null}

      <button
        className="w-full rounded-[1.5rem] bg-[var(--primary)]/80 px-4 py-3 text-sm font-semibold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-active)]/90 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      {/* Demo Mode Button */}
      <button
        type="button"
        onClick={() => {
          // Create a demo user
          const demoUser = {
            id: 1,
            email: "demo@runbuddy.com",
            username: "Demo Runner",
          };
          saveStoredUser(demoUser);
          router.push("/dashboard");
        }}
        className="w-full rounded-[1.5rem] bg-sky-500/60 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600/80"
      >
         Demo Mode (No Login)
      </button>
    </form>
  );
}
