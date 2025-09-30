import { articles } from "@/mocks/articles";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const a = articles.find((x) => String(x.id) === params.id) ?? articles[0];
  return (
    <article className="prose max-w-none">
      <h1>{a.title}</h1>
      <p>{a.content}</p>
    </article>
  );
}
