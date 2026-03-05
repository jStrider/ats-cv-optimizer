import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATS CV Optimizer - Optimisez votre CV pour les ATS",
  description:
    "Analysez et optimisez votre CV pour maximiser votre score ATS. Propulse par l'IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
