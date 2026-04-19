import { NobitexTrade } from "@/Types/ApiRes";
import axios from "axios";
import { UsdtApiPayload } from "@/Types/ApiRes";

const NOBITEX_API_BASE_URL =
    process.env.NOBITEX_API_BASE_URL ?? "https://apiv2.nobitex.ir";
const INTERNAL_API_BASE_URL = process.env.NEXT_PUBLIC_INTERNAL_API_BASE_URL ?? "";

export async function fetchTrades(symbol: string) {
    const url = `${NOBITEX_API_BASE_URL}/v2/trades/${encodeURIComponent(symbol)}`;
    const { data } = await axios.get<{ status?: string; trades?: NobitexTrade[] }>(
        url,
        {
            headers: { accept: "application/json" },
        },
    );
    if (data.status !== "ok" || !Array.isArray(data.trades)) {
        throw new Error("پاسخ نوبیتکس نامعتبر است");
    }
    return data.trades;
}

export async function fetchOrderbookTrades(symbol: string): Promise<NobitexTrade[]> {
    try {
        const { data } = await axios.get<{ trades?: NobitexTrade[]; error?: string }>(
            `${INTERNAL_API_BASE_URL}/api/nobitex/orderbook?symbol=${encodeURIComponent(symbol)}`,
        );
        if (data.error) {
            throw new Error(data.error);
        }
        return data.trades ?? [];
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const msg =
                (e.response?.data as { error?: string } | undefined)?.error ??
                e.message ??
                "خطا";
            throw new Error(msg);
        }
        throw e instanceof Error ? e : new Error("خطا");
    }
}

export async function fetchUsdtMarket(): Promise<UsdtApiPayload> {
    try {
        const { data } = await axios.get<UsdtApiPayload & { error?: string }>(
            `${INTERNAL_API_BASE_URL}/api/nobitex/market`,
        );
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const msg =
                (e.response?.data as { error?: string } | undefined)?.error ??
                e.message ??
                "خطا";
            throw new Error(msg);
        }
        throw e instanceof Error ? e : new Error("خطا");
    }
}

const NOBITEX_STATS_BASE_URL = `${NOBITEX_API_BASE_URL}/market/stats`;
const ALLOWED_CURRENCIES = new Set(
    "rls, btc, eth, ltc, usdt, xrp, bch, bnb, eos, xlm, etc, trx, pmn, doge, uni, dai, link, dot, aave, ada, shib, ftm, matic, axs, mana, sand, avax, mkr, gmt, atom, uma, w, rsr, wld, 1m_nft, flow, agld, ton, mask, snt, agix, algo, ssv, band, omg, comp, zrx, rdnt, imx, 1inch, mdt, sushi, bico, gmx, zro, bal, dao, gal, not, nmr, xmr, enj, apt, lrc, dydx, grt, near, cvx, 100k_floki, fil, sol, ldo, crv, aevo, qnt, om, woo, storj, ant, 1m_btt, magic, ape, rndr, hbar, lpt, glm, blur, wbtc, meme, ethfi, egala, arb, fet, skl, cvc, snx, jst, ens, trb, chz, xtz, api3, slp, t, bat, 1b_babydoge, celr, yfi, egld, one, 1m_pepe, usdc"
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
);

export function isAllowedCurrency(value: string): boolean {
    return ALLOWED_CURRENCIES.has(value);
}

export async function fetchStatsPair(
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
