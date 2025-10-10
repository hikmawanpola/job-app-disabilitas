"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { apiGet } from "@/lib/api";

interface Application {
  id: number;
  job_title: string;
  company_name: string;
  status: string;
  created_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuthStore();

  useEffect(() => {
    if (profile?.id) {
      fetchApplications();
    }
  }, [profile?.id]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await apiGet(`/applications/user/${profile?.id}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        My Applications
      </h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length > 0 ? (
        <ul className="space-y-3">
          {applications.map((app) => (
            <li
              key={app.id}
              className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 shadow-sm flex items-center justify-between
                         dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700"
            >
              <div>
                <p className="font-semibold">{app.job_title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {app.company_name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Applied on {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full border border-rose-200 bg-rose-50 text-brand-700
                               dark:border-neutral-700 dark:bg-neutral-800 dark:text-brand-400"
              >
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not applied for any jobs yet.</p>
      )}
    </RoleGuard>
  );
}
