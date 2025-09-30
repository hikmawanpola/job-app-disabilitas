"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminCompanies() {
  const companies = [
    { id: 1, name: "PT Akses Nusantara" },
    { id: 2, name: "CV Ramah Karya" },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Manage Companies
      </h1>

      <ul className="space-y-3">
        {companies.map((c) => (
          <li
            key={c.id}
            className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <span>{c.name}</span>
            <button className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60">
              Suspend
            </button>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
