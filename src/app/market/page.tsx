import Link from "next/link";
import Header from "@/app/components/Header";

export default function MarketPage() {
  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Header />

        <h1 className="mt-8 text-xl font-bold text-white">روند بازار</h1>

        <section className="card-elevated mt-5 rounded-2xl p-5">
          <h2 className="text-sm font-medium text-slate-400">شاخص کل</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-400">
            در حال بارگذاری
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-500">به زودی</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/5 bg-black/25">
            <img
              src="/chart.png"
              className="w-full opacity-85"
              alt="نمودار شاخص"
            />
          </div>
        </section>

        <h2 className="mb-3 mt-8 text-sm font-semibold text-slate-400">
          پربازده‌ترین نمادها
        </h2>

        <div className="space-y-3">
          {["فولاد", "خودرو", "شستا", "فملی"].map((item) => (
            <Link key={item} href={`/symbol/${encodeURIComponent(item)}`}>
              <div className="card-elevated flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 transition hover:border-cyan-400/20">
                <span className="font-medium">{item}</span>
                <span className="rounded-lg bg-white/5 px-2.5 py-1 text-sm font-semibold text-slate-400">
                  به زودی
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
