"use client";
import { Contrast, ZoomIn, ZoomOut } from "lucide-react";

export default function A11yToolbar() {
  const scale = () =>
    Number(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--text-scale"
      ) || "1"
    );
  const setScale = (v: number) =>
    document.documentElement.style.setProperty(
      "--text-scale",
      String(Math.max(0.85, Math.min(1.6, v)))
    );

  return (
    <div className="flex items-center gap-1" aria-label="Accessibility toolbar">
      <button
        className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
        aria-label="Decrease text"
        onClick={() => setScale(scale() - 0.1)}
      >
        <ZoomOut aria-hidden />
      </button>
      <button
        className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
        aria-label="Increase text"
        onClick={() => setScale(scale() + 0.1)}
      >
        <ZoomIn aria-hidden />
      </button>
      <button
        className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
        aria-label="High contrast"
        onClick={() => document.body.classList.toggle("hc")}
      >
        <Contrast aria-hidden />
      </button>
    </div>
  );
}
