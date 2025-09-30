import { SelectHTMLAttributes } from "react";
export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={"w-full rounded-xl border px-4 py-3 "+(props.className??"")} />;
}
