import Header from "@/app/components/Header";

export default function PortfolioPage() {
  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Header />

        <h1 className="mt-8 text-xl font-bold">پرتفوی من</h1>

        <section className="card-elevated mt-5 rounded-2xl p-5">
          <p className="text-2xl font-bold tracking-tight">۲۸٬۷۵۰٬۰۰۰ تومان</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-neonGreen ring-1 ring-emerald-400/20">
              +۱٫۲۳٪ امروز
            </span>
            <span className="rounded-lg bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-neonBlue ring-1 ring-sky-400/20">
              بازده سالانه: +۱۵٫۸٪
            </span>
          </div>
        </section>

        <h2 className="mb-3 mt-8 text-sm font-semibold text-slate-400">
          دارایی‌های من
        </h2>

        <div className="space-y-3">
          {[
            { name: "فولاد", pct: "+۳٫۲٪", up: true },
            { name: "خودرو", pct: "+۱٫۸٪", up: true },
            { name: "شپنا", pct: "−۰٫۷٪", up: false },
          ].map((row) => (
            <div
              key={row.name}
              className="card-elevated flex items-center justify-between rounded-2xl px-4 py-3.5"
            >
              <span className="font-medium">{row.name}</span>
              <span
                className={
                  row.up
                    ? "text-sm font-semibold text-neonGreen"
                    : "text-sm font-semibold text-rose-400"
                }
              >
                {row.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
