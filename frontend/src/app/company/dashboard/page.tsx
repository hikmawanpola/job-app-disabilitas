"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { apiGet, apiDelete } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { Job } from "@/lib/types";
import useSWR from "swr";
import { useToast } from "@/lib/toast-store";

const fetcher = (url: string) => apiGet(url);

export default function CompanyDashboard() {
  const { profile } = useAuthStore();
  const { push } = useToast();
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const {
    data: jobs,
    error,
    mutate,
  } = useSWR<Job[]>(
    profile?.id ? `/jobs/company/${profile.id}` : null,
    fetcher
  );

  const handleDelete = async () => {
    if (!jobToDelete || !jobs) return;

    // Optimistic UI update
    const updatedJobs = jobs.filter((job) => job.id !== jobToDelete.id);
    mutate(updatedJobs, false); // Update the local data, don't revalidate yet

    try {
      await apiDelete(`/jobs/${jobToDelete.id}`);
      push({ message: "Pekerjaan berhasil dihapus", type: "success" });
      mutate(); // Re-fetch from server to confirm
    } catch (error) {
      push({ message: "Gagal menghapus pekerjaan", type: "error" });
      mutate(jobs, false); // Revert to original data on error
    } finally {
      setJobToDelete(null); // Close modal
    }
  };

  return (
    <RoleGuard allow={["company"]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Your Job Postings
          </h2>
          {error ? (
            <p>Gagal memuat pekerjaan.</p>
          ) : !jobs ? (
            <p>Memuat...</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={() => setJobToDelete(job)}
              />
            ))
          ) : (
            <p>Anda belum memposting pekerjaan apa pun.</p>
          )}
        </section>
        <aside className="space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Recommended Candidates
          </h2>
          {/* Placeholder for candidates */}
        </aside>
      </div>

      {jobToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Hapus Pekerjaan
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Apakah Anda yakin ingin menghapus pekerjaan{" "}
              <strong>{jobToDelete.title}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-neutral-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-neutral-700"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}
