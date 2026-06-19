import type { LoginFormValues, RegisterFormValues } from "@/types/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values: LoginFormValues): string | null {
  if (!values.email.trim() || !values.password.trim()) {
    return "Email and password are required.";
  }

  if (!emailPattern.test(values.email)) {
    return "Enter a valid email address.";
  }

  return null;
}

export function validateRegistration(values: RegisterFormValues): string | null {
  if (
    !values.username.trim() ||
    !values.email.trim() ||
    !values.password.trim() ||
    !values.height.trim() ||
    !values.weight.trim() ||
    !values.age.trim() ||
    !values.birthday.trim()
  ) {
    return "Complete every field before creating an account.";
  }

  if (!emailPattern.test(values.email)) {
    return "Enter a valid email address.";
  }

  if (values.password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (Number(values.height) <= 0 || Number(values.weight) <= 0 || Number(values.age) <= 0) {
    return "Height, weight, and age must be positive values.";
  }

  return null;
}
