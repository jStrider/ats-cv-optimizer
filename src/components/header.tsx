import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <FileText className="h-6 w-6 text-primary" />
          <span>ATS Optimizer</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/optimize"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Optimiser mon CV
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
