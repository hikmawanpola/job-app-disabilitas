import { Candidate } from "@/lib/types";

export default function CandidateCard({ c }: { c: Candidate }) {
  return (
    <div className="card bg-white border rounded-2xl p-4">
      <h3 className="font-semibold">
        {c.name} <span className="text-xs text-slate-500">({c.category})</span>
      </h3>
      <p className="text-sm text-slate-700">{c.title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {c.skills.map((s) => (
          <span
            key={s}
            className="text-xs bg-rose-50 text-brand-700 px-2 py-1 rounded-full border"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-2 rounded-xl bg-brand-600 text-white">
          Invite
        </button>
        <button className="px-3 py-2 rounded-xl border">View profile</button>
      </div>
    </div>
  );
}
