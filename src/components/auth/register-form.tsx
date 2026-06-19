"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import { registerProfile } from "@/lib/api";
import { validateRegistration } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { saveStoredUser } from "@/lib/session";
import type { RegisterFormValues } from "@/types/auth";

import { FormInput } from "./form-input";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  height: "",
  weight: "",
  age: "",
  birthday: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateRegistration(values);
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const credential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        values.email,
        values.password,
      );
      const response = await registerProfile({
        username: values.username,
        email: values.email,
        password: values.password,
        firebaseUid: credential.user.uid,
        height: Number(values.height),
        weight: Number(values.weight),
        age: Number(values.age),
        birthday: values.birthday,
      });

      if (response.user?.id) {
        saveStoredUser(response.user as { id: number; email: string; username?: string });
      }

      setSuccess(response.message);
      router.push("/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Username"
          name="username"
          onChange={(value) => setValues((current) => ({ ...current, username: value }))}
          placeholder="Runner name"
          value={values.username}
        />
        <FormInput
          label="Email"
          name="email"
          onChange={(value) => setValues((current) => ({ ...current, email: value }))}
          placeholder="you@example.com"
          type="email"
          value={values.email}
        />
      </div>

      <FormInput
        label="Password"
        name="password"
        onChange={(value) => setValues((current) => ({ ...current, password: value }))}
        placeholder="Minimum 8 characters"
        type="password"
        value={values.password}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Height (cm)"
          min={1}
          name="height"
          onChange={(value) => setValues((current) => ({ ...current, height: value }))}
          placeholder="175"
          step={0.1}
          type="number"
          value={values.height}
        />
        <FormInput
          label="Weight (kg)"
          min={1}
          name="weight"
          onChange={(value) => setValues((current) => ({ ...current, weight: value }))}
          placeholder="68"
          step={0.1}
          type="number"
          value={values.weight}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Age"
          min={1}
          name="age"
          onChange={(value) => setValues((current) => ({ ...current, age: value }))}
          placeholder="29"
          type="number"
          value={values.age}
        />
        <FormInput
          label="Birthday"
          name="birthday"
          onChange={(value) => setValues((current) => ({ ...current, birthday: value }))}
          type="date"
          value={values.birthday}
        />
      </div>

      {error ? <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--text-muted)]">{error}</p> : null}
      {success ? (
        <p className="rounded-2xl bg-[var(--primary)]/10 px-4 py-3 text-sm text-[var(--primary)]">{success}</p>
      ) : null}

      <button
        className="w-full rounded-[1.5rem] bg-[var(--primary)]/80 px-4 py-3 text-sm font-semibold text-[var(--primary-contrast)] transition hover:bg-[var(--primary-active)]/90 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
