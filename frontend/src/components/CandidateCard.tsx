import { Candidate } from "@/lib/types";

export default function CandidateCard({ c }: { c: Candidate }) {
  return (
    <div className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm">
      <h3 className="font-semibold">
        {c.name}{" "}
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({c.category})
        </span>
      </h3>
      <p className="text-sm text-slate-700 dark:text-slate-200">{c.title}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {c.skills.map((s) => (
          <span
            key={s}
            className="text-xs bg-rose-50 dark:bg-neutral-800 text-brand-700 dark:text-brand-400 px-2 py-1 rounded-full border border-rose-200 dark:border-neutral-700"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <button className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white">
          Invite
        </button>
        <button className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800">
          View profile
        </button>
      </div>
    </div>
  );
}
