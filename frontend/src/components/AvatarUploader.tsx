"use client";
import { useRef } from "react";

export default function AvatarUploader({
  label = "Upload photo",
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange: (url?: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const pick = () => ref.current?.click();
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={value || "/avatar-placeholder.png"}
        alt="preview"
        className="h-16 w-16 rounded-full object-cover border border-slate-300 dark:border-neutral-700"
      />
      <div className="space-x-2">
        <button
          type="button"
          onClick={pick}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
        >
          {label}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
          >
            Remove
          </button>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" hidden onChange={handle} />
    </div>
  );
}
