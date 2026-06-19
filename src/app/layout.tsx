import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutClient } from "@/app/root-layout-client";

export const metadata: Metadata = {
  title: "Run Buddy",
  description: "AI-powered running coach and predictive performance tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--text)]">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
