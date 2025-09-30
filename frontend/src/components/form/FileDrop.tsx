"use client";
import { useRef } from "react";

export default function FileDrop({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      className="rounded-xl border-2 border-dashed border-slate-300 bg-white text-slate-800 p-6 text-center cursor-pointer
                 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
      onClick={() => ref.current?.click()}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && ref.current?.click()
      }
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
    >
      <p className="text-sm text-slate-700 dark:text-slate-200">
        Drop CV/Portfolio here or click to select (.pdf/.docx)
      </p>
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}
