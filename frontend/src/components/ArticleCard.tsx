import Link from "next/link";
import { Article } from "@/lib/types";

export default function ArticleCard({ a }: { a: Article }) {
  return (
    <div className="card bg-white border rounded-2xl p-4">
      <h3 className="font-semibold">{a.title}</h3>
      <p className="text-sm text-slate-700 line-clamp-2">{a.excerpt}</p>
      <Link
        href={`/articles/${a.id}`}
        className="mt-3 inline-block text-brand-600"
      >
        Read more
      </Link>
    </div>
  );
}
