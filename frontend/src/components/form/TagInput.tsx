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
    if (!v) return;
    if (value.includes(v)) return;
    onChange([...value, v]);
    setText("");
  };

  return (
    <div className="rounded-xl border dark:border-neutral-700 p-2">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span
            key={t}
            className="text-xs bg-rose-50 dark:bg-neutral-800 text-brand-700 px-2 py-1 rounded-full border dark:border-neutral-700"
          >
            {t}
            <button
              className="ml-1 text-slate-500 hover:text-brand-700"
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
          className="flex-1 min-w-[160px] bg-transparent outline-none px-2 py-1"
        />
      </div>
    </div>
  );
}
