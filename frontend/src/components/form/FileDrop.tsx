"use client";
import { useRef } from "react";

export default function FileDrop({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className="rounded-xl border-dashed border-2 p-6 text-center cursor-pointer"
      onClick={() => ref.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
    >
      <p>Drop CV/Portfolio here or click to select (.pdf/.docx)</p>
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
