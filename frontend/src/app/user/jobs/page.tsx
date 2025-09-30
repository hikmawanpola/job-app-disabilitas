"use client";
import { useState } from "react";
import JobCard from "@/components/JobCard";
import { jobs } from "@/mocks/jobs";
import Pagination from "@/components/Pagination";
import RoleGuard from "@/components/RoleGuard";

export default function JobsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const data = jobs.slice((page - 1) * pageSize, page * pageSize);
  const total = Math.ceil(jobs.length / pageSize);

  return (
    <RoleGuard allow={["user"]}>
      <div className="mb-4 grid sm:grid-cols-4 gap-3">
        <input
          placeholder="Keyword"
          className="rounded-xl border border-slate-300 dark:border-neutral-700 px-4 py-3 sm:col-span-2
                     bg-white dark:bg-neutral-900 text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        <select
          className="rounded-xl border border-slate-300 dark:border-neutral-700 px-4 py-3
                     bg-white dark:bg-neutral-900 text-slate-800 dark:text-slate-100"
        >
          <option>All categories</option>
          <option>Senior</option>
          <option>Diffable access</option>
          <option>Visual impairment friendly</option>
        </select>
        <button className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
      <Pagination page={page} total={total} onPage={setPage} />
    </RoleGuard>
  );
}
