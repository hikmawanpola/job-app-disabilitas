"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState, useEffect } from "react";
import { useToast } from "@/lib/toast-store";
import { apiGet, apiPost } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

interface Applicant {
  id: number;
  applicant_name: string;
  applicant_email: string;
  job_title: string;
  status: string;
  created_at: string;
}

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { profile } = useAuthStore();
  
  const { push } = useToast();

  useEffect(() => {
    if (profile?.id) {
      fetchApplicants();
    }
  }, [profile?.id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await apiGet(`/applications/company/${profile.id}`);
      setApplicants(response.data);
    } catch (err) {
      setError('Failed to load applicants');
      push('Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id: number, status: string) => {
    try {
      await apiPost(`/applications/${id}/status`, { status });
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      push(`Application status updated to ${status}`);
    } catch (err) {
      push('Failed to update status');
    }
  };

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Applicants
      </h1>
      <ul className="space-y-3">
        {applicants.map((a) => (
          <li
            key={a.id}
            className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{a.applicant_name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {a.job_title}
              </p>
              <p className="text-xs mt-1">
                Status: <b>{a.status}</b>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
                onClick={() => push(`Viewing ${a.applicant_name}`)}
              >
                View
              </button>
              <button
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
                onClick={() => setStatus(a.id, "Accepted")}
              >
                Accept
              </button>
              <button
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
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
