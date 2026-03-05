"use client";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Changer le theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  );
}
