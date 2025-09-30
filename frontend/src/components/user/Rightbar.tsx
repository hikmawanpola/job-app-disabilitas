"use client";
import Link from "next/link";

const quickFilters = [
  "Remote",
  "Part-time",
  "Senior",
  "Difabel-friendly",
  "High-contrast",
];
const articles = [
  {
    id: 1,
    title: "Designing Accessible UIs",
    excerpt: "Tips kontras, fokus, keyboard nav...",
  },
  {
    id: 2,
    title: "Inclusive Hiring for Seniors",
    excerpt: "Praktik baik ramah lansia...",
  },
  {
    id: 3,
    title: "Interview A11y Checklist",
    excerpt: "Pertanyaan untuk aksesibilitas...",
  },
];
const newJobs = [
  { id: 1, title: "UI Designer", company: "HaloTech" },
  { id: 2, title: "Frontend Intern", company: "Aksara" },
  { id: 3, title: "Office Assistant", company: "Sejahtera" },
  { id: 4, title: "QA Tester", company: "Rinjani" },
];

export default function UserRightbar() {
  return (
    <div className="space-y-4">
      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Quick filters
        </h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((t) => (
            <Link
              key={t}
              href={`/user/jobs?tag=${encodeURIComponent(t)}`}
              className="text-xs bg-rose-50 dark:bg-neutral-800 text-brand-700 dark:text-brand-400 px-2 py-1 rounded-full border border-rose-200 dark:border-neutral-700"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Recommended articles
        </h3>
        <ul className="space-y-2">
          {articles.map((a) => (
            <li key={a.id}>
              <Link
                href={`/articles/${a.id}`}
                className="text-sm text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400"
              >
                {a.title}
              </Link>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {a.excerpt}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          New jobs
        </h3>
        <ul className="space-y-2">
          {newJobs.map((j) => (
            <li key={j.id} className="text-sm">
              <Link
                href="/user/jobs"
                className="text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400"
              >
                {j.title}
              </Link>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {" "}
                • {j.company}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
