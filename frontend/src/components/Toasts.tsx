"use client";
import { useToast } from "@/lib/toast-store";

export default function Toasts() {
  const { toasts, remove } = useToast();
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-[60]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="card border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 shadow flex items-center gap-3"
        >
          <span className="text-sm text-slate-800 dark:text-slate-100">
            {t.text}
          </span>
          <button
            className="ml-auto text-xs text-brand-600 dark:text-brand-400 hover:underline"
            onClick={() => remove(t.id)}
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
}
