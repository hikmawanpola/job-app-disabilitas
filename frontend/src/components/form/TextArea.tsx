import { TextareaHTMLAttributes } from "react";
export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-xl border px-4 py-3 " + (props.className ?? "")
      }
    />
  );
}
