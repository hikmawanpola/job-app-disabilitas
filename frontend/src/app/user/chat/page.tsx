"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { from: "me" | "them"; text: string }[]
  >([{ from: "them", text: "Hello! We reviewed your CV." }]);
  const [text, setText] = useState("");

  return (
    <RoleGuard allow={["user"]}>
      <div className="rounded-2xl border bg-white card p-4 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-3 py-2 rounded-xl ${
                m.from === "me"
                  ? "bg-brand-600 text-white ml-auto"
                  : "bg-rose-50"
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
            className="flex-1 rounded-xl border px-4 py-3"
          />
          <button className="px-4 py-3 rounded-xl bg-brand-600 text-white">
            Send
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
