export default function PortfolioPage() {
  return (
    <main className="p-4 min-h-screen bg-darkBg text-white">
      <h1 className="text-xl font-bold mb-4">پرتفوی من</h1>

      <div className="bg-darkCard rounded-xl p-4 mb-6">
        <p className="text-2xl font-bold mb-2">28,750,000 تومان</p>
        <p className="text-neonGreen text-sm mb-1">+1.23% امروز</p>
        <p className="text-neonBlue text-sm">بازده سالانه: +15.8%</p>
      </div>

      <h2 className="text-sm text-gray-300 mb-3">دارایی‌های من</h2>

      <div className="space-y-3">
        <div className="bg-[#1f2937] p-4 rounded-xl flex justify-between">
          <span>فولاد</span>
          <span className="text-neonGreen">+3.2%</span>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-xl flex justify-between">
          <span>خودرو</span>
          <span className="text-neonGreen">+1.8%</span>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-xl flex justify-between">
          <span>شپنا</span>
          <span className="text-red-400">-0.7%</span>
        </div>
      </div>
    </main>
  );
}
