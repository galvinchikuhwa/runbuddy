import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Authentication"
      footerHref="/register"
      footerLinkLabel="Create one"
      footerText="Need an account?"
      subtitle="Sign in with Firebase Authentication to access your future training analytics, coach insights, and running history."
      title="Welcome back"
    >
      <LoginForm />
    </AuthShell>
  );
}
