import SymbolChart from "@/app/components/SymbolChart";
import SymbolInfo from "@/app/components/SymbolInfo";

export default function SymbolPage({ params }: { params: { slug: string } }) {
  const symbol = decodeURIComponent(params.slug);

  return (
    <main className="p-4 min-h-screen bg-darkBg text-white">
      <h1 className="text-xl font-bold mb-4">تحلیل نماد {symbol}</h1>

      <SymbolChart symbol={symbol} />

      <SymbolInfo symbol={symbol} />

      <div className="mt-6 text-center text-gray-400 text-sm">
        powered by SarmayeYar AI Engine
      </div>
    </main>
  );
}
