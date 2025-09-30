"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Job } from "@/lib/types";
import { useToast } from "@/lib/toast-store";
import Link from "next/link";

export default function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const { push } = useToast();

  return (
    <article className="card bg-white dark:bg-neutral-900 border dark:border-neutral-700 rounded-2xl p-4 hover:shadow-sm transition">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {job.company} • {job.location}
          </p>
        </div>
        <button
          aria-label="Save job"
          className={`p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-neutral-800 ${
            saved ? "text-brand-600" : ""
          }`}
          onClick={() => {
            setSaved(!saved);
            push(saved ? "Removed from saved" : "Saved job");
          }}
        >
          <Bookmark />
        </button>
      </header>

      <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 line-clamp-3">
        {job.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="text-xs bg-rose-50 dark:bg-neutral-800 text-brand-700 px-2 py-1 rounded-full border dark:border-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => push(`Applied to ${job.title}`)}
          className="px-3 py-2 rounded-xl bg-brand-600 text-white"
        >
          Apply
        </button>
        <Link
          href={`/articles/${job.articleId ?? "1"}`}
          className="px-3 py-2 rounded-xl border dark:border-neutral-700"
        >
          Read about accessibility
        </Link>
      </div>
    </article>
  );
}
