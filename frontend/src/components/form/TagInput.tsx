"use client";
import { useState } from "react";

export default function TagInput({
  value = [],
  onChange,
  placeholder = "Type and press Enter",
}: {
  value?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");
  const add = (t: string) => {
    const v = t.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setText("");
  };
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span
            key={t}
            className="text-xs bg-rose-50 text-brand-700 px-2 py-1 rounded-full border border-rose-200
                       dark:bg-neutral-800 dark:text-brand-400 dark:border-neutral-700"
          >
            {t}
            <button
              aria-label={`Remove ${t}`}
              className="ml-1 text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
              onClick={() => onChange(value.filter((x) => x !== t))}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(text);
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-[160px] bg-transparent outline-none px-2 py-1 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
