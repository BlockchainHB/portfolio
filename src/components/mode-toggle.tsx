"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors duration-200 dark:hidden" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors duration-200 dark:block" />
    </button>
  );
}
