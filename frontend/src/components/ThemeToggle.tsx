"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return getSystemPrefersDark() ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    if (initial) {
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/15 px-3 py-1.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      title="Alternar tema"
    >
      <span className="select-none">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">Tema</span>
    </button>
  );
}

