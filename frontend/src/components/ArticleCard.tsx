import Link from "next/link";
import { Article } from "@/lib/types";

export default function ArticleCard({ a }: { a: Article }) {
  return (
    <div className="card bg-white text-slate-900 border border-slate-300 rounded-2xl p-4 shadow-sm dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700">
      <h3 className="font-semibold">{a.title}</h3>
      <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">
        {a.excerpt}
      </p>
      <Link
        href={`/articles/${a.id}`}
        className="mt-3 inline-block text-brand-600 dark:text-brand-400"
      >
        Read more
      </Link>
    </div>
  );
}
