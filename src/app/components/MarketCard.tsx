export default function MarketCard() {
  return (
    <div className="bg-darkCard rounded-xl p-4">
      <div className="flex justify-between mb-2 text-sm text-gray-300">
        <span>نمای کلی بازار</span>
        <span className="text-neonGreen font-semibold">+3.45%</span>
      </div>

      <img src="/chart.png" className="w-full opacity-90" alt="market chart" />

      <div className="flex justify-around text-xs text-gray-400 mt-3">
        <span>1D</span>
        <span>1W</span>
        <span>1M</span>
        <span>1Y</span>
      </div>
    </div>
  );
}
