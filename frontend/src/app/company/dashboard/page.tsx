"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { apiGet } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { Job } from "@/lib/types";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuthStore();

  useEffect(() => {
    if (profile?.id) {
      fetchJobs();
    }
  }, [profile?.id]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await apiGet(`/jobs/company/${profile?.id}`);
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allow={["company"]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Your Job Postings
          </h2>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p>You haven't posted any jobs yet.</p>
          )}
        </section>
        <aside className="space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Recommended Candidates
          </h2>
          {/* Placeholder for candidates */}
        </aside>
      </div>
    </RoleGuard>
  );
}
