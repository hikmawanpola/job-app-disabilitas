"use client";
import { useState } from "react";

export type Exp = {
  id: number;
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
};

export default function ExperienceEditor({
  value = [],
  onChange,
}: {
  value?: Exp[];
  onChange: (v: Exp[]) => void;
}) {
  const [list, setList] = useState<Exp[]>(value);

  const add = () => {
    const n: Exp = {
      id: Date.now(),
      title: "",
      company: "",
      start: "",
      end: "",
      description: "",
    };
    const v = [...list, n];
    setList(v);
    onChange(v);
  };
  const update = (id: number, patch: Partial<Exp>) => {
    const v = list.map((e) => (e.id === id ? { ...e, ...patch } : e));
    setList(v);
    onChange(v);
  };
  const remove = (id: number) => {
    const v = list.filter((e) => e.id !== id);
    setList(v);
    onChange(v);
  };

  return (
    <div className="space-y-3">
      {list.map((e) => (
        <div
          key={e.id}
          className="rounded-xl border dark:border-neutral-700 p-3 space-y-2"
        >
          <div className="grid md:grid-cols-2 gap-2">
            <input
              value={e.title}
              onChange={(ev) => update(e.id, { title: ev.target.value })}
              placeholder="Title (e.g., Frontend Developer)"
              className="rounded-lg border dark:border-neutral-700 bg-transparent px-3 py-2"
            />
            <input
              value={e.company}
              onChange={(ev) => update(e.id, { company: ev.target.value })}
              placeholder="Company"
              className="rounded-lg border dark:border-neutral-700 bg-transparent px-3 py-2"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <input
              value={e.start}
              onChange={(ev) => update(e.id, { start: ev.target.value })}
              placeholder="Start (e.g., 2022-01)"
              className="rounded-lg border dark:border-neutral-700 bg-transparent px-3 py-2"
            />
            <input
              value={e.end}
              onChange={(ev) => update(e.id, { end: ev.target.value })}
              placeholder="End (or Present)"
              className="rounded-lg border dark:border-neutral-700 bg-transparent px-3 py-2"
            />
          </div>
          <textarea
            value={e.description}
            onChange={(ev) => update(e.id, { description: ev.target.value })}
            placeholder="Describe your work…"
            rows={3}
            className="rounded-lg border dark:border-neutral-700 bg-transparent px-3 py-2 w-full"
          />
          <div className="text-right">
            <button
              onClick={() => remove(e.id)}
              className="px-3 py-2 rounded-lg border dark:border-neutral-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="px-4 py-2 rounded-xl bg-brand-600 text-white"
      >
        Add experience
      </button>
    </div>
  );
}
