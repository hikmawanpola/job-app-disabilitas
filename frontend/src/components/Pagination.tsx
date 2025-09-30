export default function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="px-3 py-2 border rounded-xl disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-2">{page}</span>
      <button
        disabled={page >= total}
        onClick={() => onPage(page + 1)}
        className="px-3 py-2 border rounded-xl disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
