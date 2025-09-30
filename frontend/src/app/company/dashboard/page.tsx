"use client";
import RoleGuard from "@/components/RoleGuard";
import CandidateCard from "@/components/CandidateCard";
import { candidates } from "@/mocks/candidates";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/mocks/articles";

export default function CompanyDashboard() {
  return (
    <RoleGuard allow={["company"]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-xl">Recommended Candidates</h2>
          {candidates.slice(0, 4).map((c) => (
            <CandidateCard key={c.id} c={c} />
          ))}
        </section>
        <aside className="space-y-4">
          <h2 className="font-bold text-xl">Articles</h2>
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </aside>
      </div>
    </RoleGuard>
  );
}
