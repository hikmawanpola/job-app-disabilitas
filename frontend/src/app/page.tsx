import Link from "next/link";

export default function Page() {
  return (
    <section
      className="rounded-2xl p-6 md:p-8
                        bg-gradient-to-b from-rose-50 to-white
                        dark:from-neutral-900 dark:to-neutral-950"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]
                         text-slate-900 dark:text-white"
          >
            Find inclusive work.{" "}
            <span className="text-brand-700 dark:text-brand-400">
              Build brighter careers.
            </span>
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Platform kerja profesional yang ramah penyandang disabilitas &
            lansia—dengan aksesibilitas, filter khusus, dan antarmuka sederhana.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/auth/register"
              className="px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              Get Started
            </Link>

            {/* Secondary button dengan kontras jelas di dua tema */}
            <Link
              href="/auth/login"
              className="px-5 py-3 rounded-xl border
                         border-slate-300 text-slate-700 hover:border-brand-600 hover:text-brand-600 hover:bg-rose-50
                         dark:border-neutral-700 dark:text-slate-100 dark:hover:text-brand-400 dark:hover:bg-neutral-800
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500/60"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Fitur: profil, search/filter, post/apply job, saved jobs, lamaran,
            notifikasi, chat, artikel, dashboard admin.
          </p>
        </div>

        {/* hero-card agar tidak ikut hitam saat High-Contrast */}
        <div
          className="rounded-2xl border card hero-card p-6 bg-white shadow-sm
                        dark:bg-neutral-900 dark:border-neutral-700"
        >
          <ul className="space-y-3">
            <li>
              ✅ Aksesibilitas: ukuran teks, kontras tinggi, keyboard-friendly
            </li>
            <li>✅ 3 role: User (pencari kerja), Company, Admin</li>
            <li>✅ Ringan: Tailwind + komponen kecil</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
