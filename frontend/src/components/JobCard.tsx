"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Job } from "@/lib/types";
import { useToast } from "@/lib/toast-store";
import Link from "next/link";

import { useAuthStore } from "@/lib/auth-store";
import { apiPost } from "@/lib/api";

export default function JobCard({
  job,
  onDelete,
}: {
  job: Job;
  onDelete?: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const { push } = useToast();
  const { role, profile } = useAuthStore();

  const handleApply = async () => {
    if (role !== 'user' || !profile?.id) {
      push({ message: "You must be logged in as a user to apply.", type: "error" });
      return;
    }

    if (window.confirm("Are you sure you want to apply for this job?")) {
      try {
        const res = await apiPost('/applications', {
          job_id: job.id,
          user_id: profile.id,
        });
        push({ message: res.message || "Application submitted successfully!", type: "success" });
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          push({ message: "You have already applied for this job.", type: "error" });
        } else {
          push({ message: "Failed to submit application.", type: "error" });
        }
      }
    }
  };

  return (
    <article className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 hover:shadow-sm transition dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {job.company} • {job.location}
          </p>
        </div>
        <button
          aria-label="Save job"
          className={`p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60 ${
            saved ? "text-brand-600" : ""
          }`}
          onClick={() => {
            setSaved(!saved);
            push({ message: saved ? "Removed from saved" : "Saved job", type: "info" });
          }}
        >
          <Bookmark />
        </button>
      </header>

      <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 line-clamp-3">
        {job.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="text-xs bg-rose-50 text-brand-700 border border-rose-200 px-2 py-1 rounded-full dark:bg-neutral-800 dark:text-brand-400 dark:border-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2 items-center">
        {role === 'company' ? (
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {job.applicant_count} applicant(s)
            </div>
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ) : (
          <button 
            onClick={handleApply}
            className="px-3 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            Apply
          </button>
        )}
        <Link
          href={`/articles/${job.articleId ?? "1"}`}
          className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-rose-50 dark:border-neutral-700 dark:text-slate-100 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
        >
          Read about accessibility
        </Link>
      </div>
    </article>
  );
}
