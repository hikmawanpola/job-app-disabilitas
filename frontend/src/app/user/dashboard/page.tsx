"use client";
import RoleGuard from "@/components/RoleGuard";
import JobCard from "@/components/JobCard";
import ArticleCard from "@/components/ArticleCard";
import { jobs } from "@/mocks/jobs";
import { articles } from "@/mocks/articles";

export default function UserDashboard() {
  return (
    <RoleGuard allow={["user"]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="mb-4">
            <a
              href="/user/profile"
              className="px-3 py-2 rounded-xl border dark:border-neutral-700"
            >
              Edit profile
            </a>
          </div>
          <h2 className="font-bold text-xl">Recommended Jobs</h2>
          {jobs.slice(0, 4).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </section>
        <aside className="space-y-4">
          <h2 className="font-bold text-xl">Recommended Articles</h2>
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </aside>
      </div>
    </RoleGuard>
  );
}
