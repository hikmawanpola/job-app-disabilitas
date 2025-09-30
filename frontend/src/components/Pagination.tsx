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
        className="px-3 py-2 border border-slate-300 dark:border-neutral-700 rounded-xl disabled:opacity-50
                   text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800"
      >
        Prev
      </button>
      <span className="px-3 py-2 text-slate-800 dark:text-slate-100">
        {page}
      </span>
      <button
        disabled={page >= total}
        onClick={() => onPage(page + 1)}
        className="px-3 py-2 border border-slate-300 dark:border-neutral-700 rounded-xl disabled:opacity-50
                   text-slate-800 dark:text-slate-100 hover:bg-rose-50 dark:hover:bg-neutral-800"
      >
        Next
      </button>
    </div>
  );
}
