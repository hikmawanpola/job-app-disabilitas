"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useThemeStore } from "@/lib/theme-store";

export default function ThemeToggle() {
  const { dark, setDark, toggle } = useThemeStore();
  useEffect(() => {
    // sinkron awal dari localStorage
    try {
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-neutral-800"
      onClick={toggle}
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
