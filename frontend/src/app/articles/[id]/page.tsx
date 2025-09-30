import { articles } from "@/mocks/articles";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const a = articles.find((x) => String(x.id) === params.id) ?? articles[0];
  return (
    <article className="page-content max-w-none">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
        {a.title}
      </h1>
      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
        {a.content}
      </p>
    </article>
  );
}
