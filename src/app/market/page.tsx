import Link from "next/link";

export default function MarketPage() {
  return (
    <main className="p-4 min-h-screen bg-darkBg text-white">
      <h1 className="text-xl font-bold mb-4">روند بازار</h1>

      <div className="bg-darkCard rounded-xl p-4 mb-6">
        <h2 className="text-sm text-gray-300 mb-2">شاخص کل</h2>
        <p className="text-2xl font-bold text-neonBlue">2,346,120</p>
        <p className="text-neonGreen text-sm mt-1">+1.54%</p>
        <img src="/chart.png" className="w-full mt-4 opacity-80" />
      </div>

      <h2 className="text-sm text-gray-300 mb-3">پربازده‌ترین نمادها</h2>

      <div className="space-y-3">
        {["فولاد", "خودرو", "شستا", "فملی"].map((item) => (
          <Link key={item} href={`/symbol/${item}`}>
            <div className="bg-[#1f2937] p-3 rounded-xl flex justify-between cursor-pointer">
              <span>{item}</span>
              <span className="text-neonGreen">+2.1%</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
