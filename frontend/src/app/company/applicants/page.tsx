"use client";
import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";
import { useToast } from "@/lib/toast-store";
import { apiGet, apiPatch } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import useSWR from "swr";
import { MoreVertical, Check, X, Clock } from "lucide-react";

type ApplicationStatus = "Pending" | "Accepted" | "Rejected";

interface Applicant {
  id: number;
  applicant_name: string;
  applicant_email: string;
  job_title: string;
  status: ApplicationStatus;
  created_at: string;
}

const fetcher = (url: string) => apiGet(url).then((res) => res.data);

export default function ApplicantsPage() {
  const { profile } = useAuthStore();
  const { push } = useToast();

  const {
    data: applicants,
    error,
    mutate,
  } = useSWR<Applicant[]>(
    profile && profile.id ? `/applications/company/${profile.id}` : null,
    fetcher
  );

  const updateStatus = async (id: number, status: ApplicationStatus) => {
    try {
      await apiPatch(`/applications/${id}/status`, { status });
      mutate(); // Re-fetch data to update UI
      push({
        message: `Lamaran telah ${
          status === "Accepted"
            ? "diterima"
            : status === "Rejected"
            ? "ditolak"
            : "ditandai pending"
        }`,
        type: "success",
      });
    } catch (err) {
      push({
        message: "Gagal memperbarui status lamaran",
        type: "error",
      });
    }
  };

  if (error) return <div>Gagal memuat data pelamar.</div>;
  if (!applicants) return <div>Memuat...</div>;

  return (
    <RoleGuard allow={["company"]}>
      <h1 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Pelamar
      </h1>
      <ul className="space-y-3">
        {applicants.map((a) => (
          <ApplicantCard key={a.id} applicant={a} onUpdateStatus={updateStatus} />
        ))}
      </ul>
    </RoleGuard>
  );
}

function ApplicantCard({
  applicant: a,
  onUpdateStatus,
}: {
  applicant: Applicant;
  onUpdateStatus: (id: number, status: ApplicationStatus) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <li className="card bg-white dark:bg-neutral-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-neutral-700 rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="font-semibold">{a.applicant_name}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {a.job_title}
        </p>
        <p
          className={`text-xs mt-1 font-bold ${
            a.status === "Accepted"
              ? "text-emerald-500"
              : a.status === "Rejected"
              ? "text-rose-500"
              : "text-slate-500"
          }`}
        >
          Status: {a.status}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {a.status === "Pending" ? (
          <>
            <button
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              onClick={() => onUpdateStatus(a.id, "Accepted")}
            >
              <Check size={16} /> Terima
            </button>
            <button
              className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
              onClick={() => onUpdateStatus(a.id, "Rejected")}
            >
              <X size={16} /> Tolak
            </button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              <MoreVertical size={20} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  {a.status !== "Accepted" && (
                    <li>
                      <button
                        onClick={() => {
                          onUpdateStatus(a.id, "Accepted");
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2"
                      >
                        <Check size={14} /> Tandai Diterima
                      </button>
                    </li>
                  )}
                  {a.status !== "Rejected" && (
                    <li>
                      <button
                        onClick={() => {
                          onUpdateStatus(a.id, "Rejected");
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2"
                      >
                        <X size={14} /> Tandai Ditolak
                      </button>
                    </li>
                  )}
                  {(a.status === "Accepted" || a.status === "Rejected") && (
                    <li>
                      <button
                        onClick={() => {
                          onUpdateStatus(a.id, "Pending");
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-700 flex items-center gap-2"
                      >
                        <Clock size={14} /> Kembalikan ke Pending
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
