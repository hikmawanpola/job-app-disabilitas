"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { from: "me" | "them"; text: string }[]
  >([{ from: "them", text: "Hello! We reviewed your CV." }]);
  const [text, setText] = useState("");

  const field =
    "flex-1 rounded-xl border border-slate-300 bg-white text-slate-800 px-4 py-3 " +
    "dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100";

  return (
    <RoleGuard allow={["user"]}>
      <div
        className="rounded-2xl border border-slate-300 bg-white card p-4 h-[60vh] flex flex-col shadow-sm
                   dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="flex-1 overflow-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-3 py-2 rounded-xl ${
                m.from === "me"
                  ? "bg-brand-600 text-white ml-auto"
                  : "bg-rose-50 text-slate-900 dark:bg-neutral-800 dark:text-slate-100"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (text) {
              setMessages([...messages, { from: "me", text }]);
              setText("");
            }
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message…"
            className={field}
          />
          <button className="px-4 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
            Send
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
