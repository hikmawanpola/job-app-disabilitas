"use client";
import { useToast, ToastType } from "@/lib/toast-store";
import { CheckCircle, XCircle, Info } from "lucide-react";

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="text-emerald-500" />,
  error: <XCircle className="text-rose-500" />,
  info: <Info className="text-blue-500" />,
};

const toastStyles: Record<ToastType, string> = {
  success: "bg-emerald-50 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800",
  error: "bg-rose-50 dark:bg-rose-900/50 border-rose-200 dark:border-rose-800",
  info: "bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800",
};

export default function Toasts() {
  const { toasts, remove } = useToast();
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`w-80 rounded-xl p-4 border shadow-lg flex items-center gap-3 animate-fade-in-up ${toastStyles[t.type]}`}
        >
          <div>{toastIcons[t.type]}</div>
          <p className="text-sm text-slate-800 dark:text-slate-100 flex-1">{t.message}</p>
          <button onClick={() => remove(t.id)} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">&times;</button>
        </div>
      ))}
    </div>
  );
}
