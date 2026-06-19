import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Authentication"
      footerHref="/login"
      footerLinkLabel="Sign in"
      footerText="Already have an account?"
      subtitle="Create a Run Buddy account with your biometrics so later phases can personalize coaching, analytics, and performance predictions."
      title="Create your account"
    >
      <RegisterForm />
    </AuthShell>
  );
}
