"use client";
import RoleGuard from "@/components/RoleGuard";

export default function AdminDashboard() {
  const stats = [
    { label: "Users", value: 1200 },
    { label: "Companies", value: 220 },
    { label: "Jobs", value: 860 },
    { label: "Articles", value: 45 },
  ];
  return (
    <RoleGuard allow={["admin"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {s.label}
            </p>
            <p className="text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </RoleGuard>
  );
}
