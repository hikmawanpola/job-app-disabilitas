"use client";
import RoleGuard from "@/components/RoleGuard";
import { jobs } from "@/mocks/jobs";

export default function ApplicationsPage() {
  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4">My Applications</h1>
      <ul className="space-y-3">
        {jobs.slice(0, 4).map((j) => (
          <li
            key={j.id}
            className="card bg-white border rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{j.title}</p>
              <p className="text-sm text-slate-600">{j.company}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full border bg-rose-50 text-brand-700">
              Under review
            </span>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
