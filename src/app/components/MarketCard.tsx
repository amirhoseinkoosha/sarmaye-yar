export default function MarketCard() {
  return (
    <section className="card-elevated rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-200">نمای کلی بازار</h2>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-neonGreen ring-1 ring-emerald-400/25">
          +۳٫۴۵٪
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "شاخص کل", value: "۲٫۳M", tone: "text-cyan-200" },
          { label: "ارزش معاملات", value: "۱۸٫۲K", tone: "text-violet-200" },
          { label: "نمادهای مثبت", value: "۷۸٪", tone: "text-emerald-200" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center"
          >
            <p className="text-[11px] text-slate-500">{item.label}</p>
            <p className={`mt-1 text-sm font-bold ${item.tone}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-between gap-2 rounded-xl border border-white/5 bg-black/20 px-2 py-2 text-[11px] font-medium text-slate-500">
        {["۱ روز", "۱ هفته", "۱ ماه", "۱ سال"].map((t) => (
          <span
            key={t}
            className="flex-1 rounded-lg py-1.5 text-center transition hover:bg-white/5 hover:text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
