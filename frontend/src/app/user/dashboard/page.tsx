"use client";
import RoleGuard from "@/components/RoleGuard";
import JobCard from "@/components/JobCard";
import ArticleCard from "@/components/ArticleCard";
import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { Job } from "@/lib/types";
import { articles } from "@/mocks/articles";

export default function UserDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/jobs/recommended");
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allow={["user"]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="mb-4">
            <a
              href="/user/profile"
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-neutral-700
                         text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800"
            >
              Edit profile
            </a>
          </div>

          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Recommended Jobs
          </h2>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            jobs.map((j) => <JobCard key={j.id} job={j} />)
          ) : (
            <p>No jobs found.</p>
          )}
        </section>

        <aside className="space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white">
            Recommended Articles
          </h2>
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </aside>
      </div>
    </RoleGuard>
  );
}
