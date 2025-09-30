import { SelectHTMLAttributes } from "react";
export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-xl border border-slate-300 bg-white text-slate-800 px-4 py-3 " +
        "dark:bg-neutral-900 dark:text-slate-100 dark:border-neutral-700 " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 " +
        (props.className ?? "")
      }
    />
  );
}
