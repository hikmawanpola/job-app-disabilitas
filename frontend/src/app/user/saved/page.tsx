"use client";
import RoleGuard from "@/components/RoleGuard";
import JobCard from "@/components/JobCard";
import { jobs } from "@/mocks/jobs";

export default function SavedJobs() {
  return (
    <RoleGuard allow={["user"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Saved Jobs
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.slice(2, 6).map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </RoleGuard>
  );
}
