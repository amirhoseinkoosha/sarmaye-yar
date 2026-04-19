export default function PortfolioCard() {
  return (
    <section className="card-elevated rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-slate-200">پرتفوی من</h2>

      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-400">
        در حال بارگذاری
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400 ring-1 ring-white/10">
          داده روزانه به زودی
        </span>
        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400 ring-1 ring-white/10">
          بازده سالانه به زودی
        </span>
      </div>
    </section>
  );
}
