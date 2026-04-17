export default function SymbolChart({ symbol }: { symbol: string }) {
  return (
    <div className="bg-darkCard rounded-xl p-4 mb-6">
      <p className="text-gray-300 text-sm mb-2">نمودار {symbol}</p>

      {/* تصویر آزمایشی - بعداً ApexCharts اضافه می‌کنیم */}
      <img src="/chart.png" className="w-full opacity-90" />

      <div className="flex justify-around text-xs text-gray-400 mt-3">
        <span>1D</span>
        <span>1W</span>
        <span>1M</span>
        <span>1Y</span>
      </div>
    </div>
  );
}
