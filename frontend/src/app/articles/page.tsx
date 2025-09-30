import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/mocks/articles";

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Articles</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} a={a} />
        ))}
      </div>
    </div>
  );
}
