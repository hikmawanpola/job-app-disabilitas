import { InputHTMLAttributes } from "react";
export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"w-full rounded-xl border px-4 py-3 "+(props.className??"")} />;
}
