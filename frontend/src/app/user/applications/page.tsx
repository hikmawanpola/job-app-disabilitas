"use client";
import RoleGuard from "@/components/RoleGuard";
import { jobs } from "@/mocks/jobs";

export default function ApplicationsPage() {
  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        My Applications
      </h1>
      <ul className="space-y-3">
        {jobs.slice(0, 4).map((j) => (
          <li
            key={j.id}
            className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 shadow-sm flex items-center justify-between
                       dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700"
          >
            <div>
              <p className="font-semibold">{j.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {j.company}
              </p>
            </div>
            <span
              className="text-xs px-2 py-1 rounded-full border border-rose-200 bg-rose-50 text-brand-700
                             dark:border-neutral-700 dark:bg-neutral-800 dark:text-brand-400"
            >
              Under review
            </span>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
