import Header from "@/app/components/Header";

export default function PortfolioPage() {
  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Header />

        <h1 className="mt-8 text-xl font-bold">پرتفوی من</h1>

        <section className="card-elevated mt-5 rounded-2xl p-5">
          <p className="text-2xl font-bold tracking-tight text-slate-400">
            در حال بارگذاری
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400 ring-1 ring-white/10">
              تغییر روزانه به زودی
            </span>
            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400 ring-1 ring-white/10">
              بازده سالانه به زودی
            </span>
          </div>
        </section>

        <h2 className="mb-3 mt-8 text-sm font-semibold text-slate-400">
          دارایی‌های من
        </h2>

        <div className="space-y-3">
          {["فولاد", "خودرو", "شپنا"].map((name) => (
            <div
              key={name}
              className="card-elevated flex items-center justify-between rounded-2xl px-4 py-3.5"
            >
              <span className="font-medium">{name}</span>
              <span className="text-sm font-semibold text-slate-400">به زودی</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
