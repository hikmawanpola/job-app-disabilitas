"use client";
import RoleGuard from "@/components/RoleGuard";
import CandidateCard from "@/components/CandidateCard";
import { candidates } from "@/mocks/candidates";

export default function CompanySearchCandidates() {
  return (
    <RoleGuard allow={["company"]}>
      <div
        className="mb-4 grid sm:grid-cols-4 gap-3 card bg-white dark:bg-neutral-900
                   text-slate-900 dark:text-slate-100
                   border border-slate-300 dark:border-neutral-700 rounded-2xl p-3 shadow-sm"
      >
        <input
          placeholder="Keyword"
          className="rounded-xl border border-slate-300 dark:border-neutral-700 px-4 py-3 sm:col-span-2
                     bg-white dark:bg-neutral-900
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     text-slate-900 dark:text-slate-100"
        />
        <select
          className="rounded-xl border border-slate-300 dark:border-neutral-700 px-4 py-3
                     bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100"
        >
          <option>All</option>
          <option>Senior</option>
          <option>Difabel</option>
          <option>Sindrom</option>
        </select>
        <button
          className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
        >
          Filter
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {candidates.map((c) => (
          <CandidateCard key={c.id} c={c} />
        ))}
      </div>
    </RoleGuard>
  );
}
