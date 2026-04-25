import ActionButtons from "@/app/components/ActionButtons";
import BaleWebAppPanel from "@/app/components/BaleWebAppPanel";
import Header from "@/app/components/Header";
import MarketCard from "@/app/components/MarketCard";
import PortfolioCard from "@/app/components/PortfolioCard";
import UsdtLiveChart from "@/app/components/UsdtLiveChart";

export default function Home() {
  return (
    <main className="app-surface min-h-screen text-white">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Header />

        <div className="mt-8 space-y-6">
          <UsdtLiveChart />
          <MarketCard />
          <PortfolioCard />
          <ActionButtons />
          <BaleWebAppPanel />
        </div>
      </div>
    </main>
  );
}
