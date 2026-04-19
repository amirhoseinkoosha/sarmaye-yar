import { NextResponse } from "next/server";
import axios from "axios";

const CHART_URL =
  "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=1";
const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd&include_24hr_change=true";

export type UsdtApiPayload = {
  prices: [number, number][];
  usd: number;
  usd24hChange: number | null;
  updatedAt: number;
};

export async function GET() {
  try {
    const [chartRes, priceRes] = await Promise.all([
      axios.get<{ prices?: [number, number][] }>(CHART_URL, {
        headers: { accept: "application/json" },
      }),
      axios.get<{ tether?: { usd?: number; usd_24h_change?: number } }>(
        PRICE_URL,
        {
          headers: { accept: "application/json" },
        },
      ),
    ]);
    const chartJson = chartRes.data;
    const priceJson = priceRes.data;

    const prices = chartJson.prices ?? [];
    const tether = priceJson.tether ?? {};

    const payload: UsdtApiPayload = {
      prices,
      usd: typeof tether.usd === "number" ? tether.usd : 1,
      usd24hChange:
        typeof tether.usd_24h_change === "number"
          ? tether.usd_24h_change
          : null,
      updatedAt: Date.now(),
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
