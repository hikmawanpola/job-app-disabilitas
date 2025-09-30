"use client";
import Link from "next/link";

export default function CompanyRightbar() {
  return (
    <div className="space-y-4">
      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Suggested candidates
        </h3>
        <ul className="space-y-2">
          {["Ayu – Frontend", "Bima – QA", "Sari – PM"].map((n, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="text-sm text-slate-800 dark:text-slate-100">
                {n}
              </div>
              <Link
                href="/company/search"
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Draft jobs
        </h3>
        <ul className="list-disc text-sm pl-5">
          <li>
            <Link
              href="/company/post-job"
              className="text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400"
            >
              UI Designer (draft)
            </Link>
          </li>
          <li>
            <Link
              href="/company/post-job"
              className="text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Office Assistant (draft)
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
