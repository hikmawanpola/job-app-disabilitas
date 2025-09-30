"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";
import { useToast } from "@/lib/toast-store";

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Fatih", title: "Graphic Designer", status: "Pending" },
    { id: 2, name: "Siti", title: "Part-time Assistant", status: "Pending" },
  ]);
  const { push } = useToast();

  const setStatus = (id: number, status: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    push(`${status} applicant #${id}`);
  };

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4">Applicants</h1>
      <ul className="space-y-3">
        {applicants.map((a) => (
          <li
            key={a.id}
            className="card bg-white dark:bg-neutral-900 border dark:border-neutral-700 rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {a.title}
              </p>
              <p className="text-xs mt-1">
                Status: <b>{a.status}</b>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 rounded-xl border dark:border-neutral-700"
                onClick={() => push(`Viewing ${a.name}`)}
              >
                View
              </button>
              <button
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white"
                onClick={() => setStatus(a.id, "Accepted")}
              >
                Accept
              </button>
              <button
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-neutral-800"
                onClick={() => setStatus(a.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </RoleGuard>
  );
}
