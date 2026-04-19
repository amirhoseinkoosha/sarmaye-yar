import { NobitexTrade } from "@/Types/ApiRes";
import axios from "axios";
import { UsdtApiPayload } from "@/Types/ApiRes";
import { ALLOWED_CURRENCIES, normalizeSymbol } from "@/utils/Helperfunctions";

// Nobitex public API base URL, fallback to default if not found in env
const NOBITEX_API_BASE_URL =
    process.env.NOBITEX_API_BASE_URL ?? "https://apiv2.nobitex.ir";

// Fetch recent trades for a given symbol from Nobitex public API
async function fetchTrades(symbol: string) {
    const url = `${NOBITEX_API_BASE_URL}/v2/trades/${encodeURIComponent(symbol)}`;
    const { data } = await axios.get<{ status?: string; trades?: NobitexTrade[] }>(
        url,
        {
            headers: { accept: "application/json" },
        },
    );
    // Validate Nobitex response
    if (data.status !== "ok" || !Array.isArray(data.trades)) {
        throw new Error("Invalid Nobitex response");
    }
    return data.trades;
}

// Fetch trades after normalizing the symbol (e.g. for orderbook explorer)
export async function fetchOrderbookTrades(symbol: string): Promise<NobitexTrade[]> {
    const normalized = normalizeSymbol(symbol);
    if (!normalized) {
        throw new Error("Invalid symbol");
    }
    return fetchTrades(normalized);
}

// Fetch USDT/IRR (or another pair) market stats (price etc) from stats API
export async function fetchUsdtMarket(
    srcCurrency: string = "usdt",
    dstCurrency: string = "rls",
): Promise<UsdtApiPayload> {
    const src = srcCurrency.trim().toLowerCase();
    const dst = dstCurrency.trim().toLowerCase();
    // Check if both currencies are supported by Nobitex
    if (!isAllowedCurrency(src) || !isAllowedCurrency(dst)) {
        throw new Error("Invalid srcCurrency/dstCurrency");
    }

    const payload = await fetchStatsPair(src, dst);
    if (!payload) {
        throw new Error("bad_upstream");
    }
    return payload;
}

// Stats API endpoint for market quotes and changes
const NOBITEX_STATS_BASE_URL = `${NOBITEX_API_BASE_URL}/market/stats`;



// Check whether a given currency string is allowed for Nobitex stats API
function isAllowedCurrency(value: string): boolean {
    return ALLOWED_CURRENCIES.has(value);
}

// Fetch detailed pair stats such as price, best buy/sell, daily change, returns null for error or missing data
async function fetchStatsPair(
    src: string,
    dst: string,
): Promise<UsdtApiPayload | null> {
    const { data } = await axios.get<{
        status?: string;
        stats?: Record<
            string,
            {
                latest?: string;
                dayChange?: string;
                bestSell?: string;
                bestBuy?: string;
                mark?: string;
            }
        >;
    }>(NOBITEX_STATS_BASE_URL, {
        params: { srcCurrency: src, dstCurrency: dst },
        headers: { accept: "application/json" },
    });

    // Reject if stats payload is not ok
    if (data?.status !== "ok") return null;

    const pairKey = `${src}-${dst}`;
    const stat = data?.stats?.[pairKey];
    const rls = stat?.latest ? Number(stat.latest) : NaN;
    if (!Number.isFinite(rls)) return null;

    const dayChange = stat?.dayChange ? Number(stat.dayChange) : null;
    const bestSell = stat?.bestSell ? Number(stat.bestSell) : null;
    const bestBuy = stat?.bestBuy ? Number(stat.bestBuy) : null;
    const mark = stat?.mark ? Number(stat.mark) : null;

    return {
        rls,
        toman: rls / 10,
        bestSell: Number.isFinite(bestSell as number) ? (bestSell as number) : null,
        bestBuy: Number.isFinite(bestBuy as number) ? (bestBuy as number) : null,
        mark: Number.isFinite(mark as number) ? (mark as number) : null,
        dayChange: Number.isFinite(dayChange as number) ? (dayChange as number) : null,
        updatedAt: Date.now(),
    };
}
