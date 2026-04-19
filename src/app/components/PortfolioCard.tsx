export default function PortfolioCard() {
  return (
    <section className="card-elevated rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-slate-200">پرتفوی من</h2>

      <p className="mt-4 text-2xl font-bold tracking-tight text-white">
        ۲۸٬۷۵۰٬۰۰۰ تومان
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-neonGreen ring-1 ring-emerald-400/20">
          +۱٫۲۳٪ امروز
        </span>
        <span className="rounded-lg bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-neonBlue ring-1 ring-sky-400/20">
          بازده سالانه +۱۵٫۸٪
        </span>
      </div>
    </section>
  );
}
