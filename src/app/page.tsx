import Header from "@/app/components/Header";
import MarketCard from "@//app/components/MarketCard";
import PortfolioCard from "@//app/components/PortfolioCard";
import ActionButtons from "@/app/components/ActionButtons";

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-darkBg text-white">
      <Header />

      <div className="mt-6 space-y-6 px-2 xl:px-30">
        <MarketCard />
        <PortfolioCard />
        <ActionButtons />
      </div>
    </main>
  );
}
