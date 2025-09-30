"use client";
import RoleGuard from "@/components/RoleGuard";
import CandidateCard from "@/components/CandidateCard";
import { candidates } from "@/mocks/candidates";

export default function CompanySearchCandidates() {
  return (
    <RoleGuard allow={["company"]}>
      <div className="mb-4 grid sm:grid-cols-4 gap-3">
        <input
          placeholder="Keyword"
          className="rounded-xl border px-4 py-3 sm:col-span-2"
        />
        <select className="rounded-xl border px-4 py-3">
          <option>All</option>
          <option>Senior</option>
          <option>Difabel</option>
          <option>Sindrom</option>
        </select>
        <button className="rounded-xl bg-brand-600 text-white px-4 py-3">
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
