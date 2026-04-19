import Header from "@/app/components/Header";
import OrderbookExplorer from "@/app/components/OrderbookExplorer";

const NOBITEX_API_BASE_URL =
  process.env.NOBITEX_API_BASE_URL ?? "https://apiv2.nobitex.ir";

export default function OrderbookPage() {
  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Header />

        <h1 className="mt-8 text-xl font-bold">معاملات اخیر نوبیتکس</h1>
        {/* <p className="mt-1 text-sm text-slate-500">
          API عمومی{" "}
          <a
            href={`${NOBITEX_API_BASE_URL}/v2/trades/BTCIRT`}
            className="text-cyan-400/90 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GET v2/trades
          </a>
        </p> */}

        <OrderbookExplorer />
      </div>
    </main>
  );
}
