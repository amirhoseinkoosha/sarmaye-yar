export default function SymbolInfo({ symbol }: { symbol: string }) {
  const points = [
    "روند کلی: صعودی",
    "قدرت خریدار حقیقی: بالا",
    "میانگین متحرک ۲۰ روزه: بالای قیمت",
    "سیگنال تکنیکال: خرید کوتاه‌مدت",
  ];

  return (
    <section className="card-elevated rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-slate-200">
        تحلیل سریع {symbol}
      </h2>

      <ul className="mt-4 space-y-3 text-sm text-slate-400">
        {points.map((text) => (
          <li key={text} className="flex items-start gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/90"
              aria-hidden
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
