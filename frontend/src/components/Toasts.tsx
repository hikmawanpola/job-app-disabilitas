"use client";
import { useToast } from "@/lib/toast-store";

export default function Toasts() {
  const { toasts, remove } = useToast();
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-[60]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="card border rounded-xl px-4 py-3 bg-white shadow dark:bg-neutral-900 dark:border-neutral-700 flex items-center gap-3"
        >
          <span className="text-sm">{t.text}</span>
          <button
            className="ml-auto text-xs text-brand-600"
            onClick={() => remove(t.id)}
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
}
