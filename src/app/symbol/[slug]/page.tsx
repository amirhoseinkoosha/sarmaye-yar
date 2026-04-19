import SymbolChart from "@/app/components/SymbolChart";
import SymbolInfo from "@/app/components/SymbolInfo";

export default async function SymbolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symbol = decodeURIComponent(slug);

  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <h1 className="text-xl font-bold">تحلیل نماد {symbol}</h1>

        <div className="mt-6 space-y-5">
          <SymbolChart symbol={symbol} />
          <SymbolInfo symbol={symbol} />
        </div>

        <p className="mt-10 pb-2 text-center text-xs text-slate-600">
          powered by SarmayeYar AI Engine
        </p>
      </div>
    </main>
  );
}
