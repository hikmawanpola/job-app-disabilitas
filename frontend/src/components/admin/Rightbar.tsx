"use client";

export default function AdminRightbar() {
  const stats = [
    { label: "Users", value: 1200 },
    { label: "Companies", value: 220 },
    { label: "Jobs", value: 860 },
    { label: "Articles", value: 45 },
  ];
  return (
    <div className="space-y-4">
      <section className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          System stats
        </h3>
        <ul className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="rounded-lg border border-slate-300 dark:border-neutral-700 p-3"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {s.label}
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {s.value}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
