export default function SymbolChart({ symbol }: { symbol: string }) {
  return (
    <section className="card-elevated rounded-2xl p-5">
      <p className="text-sm font-medium text-slate-400">نمودار {symbol}</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/25">
        <img
          src="/chart.png"
          className="w-full opacity-90"
          alt={`نمودار ${symbol}`}
        />
      </div>

      <div className="mt-4 flex justify-between gap-2 text-[11px] font-medium text-slate-500">
        {["۱ روز", "۱ هفته", "۱ ماه", "۱ سال"].map((t) => (
          <span
            key={t}
            className="flex-1 rounded-lg py-2 text-center transition hover:bg-white/5 hover:text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
