import { NextResponse } from "next/server";
import axios from "axios";
import { UsdtApiPayload } from "@/Types/ApiRes";

const NOBITEX_STATS_BASE_URL = "https://apiv2.nobitex.ir/market/stats";
const DEFAULT_SRC = "usdt";
const DEFAULT_DST = "rls";
const ALLOWED_CURRENCIES = new Set(
  "rls, btc, eth, ltc, usdt, xrp, bch, bnb, eos, xlm, etc, trx, pmn, doge, uni, dai, link, dot, aave, ada, shib, ftm, matic, axs, mana, sand, avax, mkr, gmt, atom, uma, w, rsr, wld, 1m_nft, flow, agld, ton, mask, snt, agix, algo, ssv, band, omg, comp, zrx, rdnt, imx, 1inch, mdt, sushi, bico, gmx, zro, bal, dao, gal, not, nmr, xmr, enj, apt, lrc, dydx, grt, near, cvx, 100k_floki, fil, sol, ldo, crv, aevo, qnt, om, woo, storj, ant, 1m_btt, magic, ape, rndr, hbar, lpt, glm, blur, wbtc, meme, ethfi, egala, arb, fet, skl, cvc, snx, jst, ens, trb, chz, xtz, api3, slp, t, bat, 1b_babydoge, celr, yfi, egld, one, 1m_pepe, usdc"
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);


export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const src = (sp.get("srcCurrency") ?? DEFAULT_SRC).trim().toLowerCase();
  const dst = (sp.get("dstCurrency") ?? DEFAULT_DST).trim().toLowerCase();
  if (!ALLOWED_CURRENCIES.has(src) || !ALLOWED_CURRENCIES.has(dst)) {
    return NextResponse.json(
      { error: "invalid_currency", message: "srcCurrency/dstCurrency نامعتبر است" },
      { status: 400 },
    );
  }

  try {
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

    // Check for valid status from Nobitex
    if (data?.status !== "ok") {
      return NextResponse.json({ error: "bad_upstream" }, { status: 502 });
    }

    // Extract USDT-IRR statistics
    const pairKey = `${src}-${dst}`;
    const stat = data?.stats?.[pairKey];
    const rls = stat?.latest ? Number(stat.latest) : NaN;
    if (!Number.isFinite(rls)) {
      return NextResponse.json({ error: "bad_upstream" }, { status: 502 });
    }
    const dayChange = stat?.dayChange ? Number(stat.dayChange) : null;
    const bestSell = stat?.bestSell ? Number(stat.bestSell) : null;
    const bestBuy = stat?.bestBuy ? Number(stat.bestBuy) : null;
    const mark = stat?.mark ? Number(stat.mark) : null;

    // Build payload to return to client
    const payload: UsdtApiPayload = {
      rls,
      toman: rls / 10,
      bestSell: Number.isFinite(bestSell as number) ? (bestSell as number) : null,
      bestBuy: Number.isFinite(bestBuy as number) ? (bestBuy as number) : null,
      mark: Number.isFinite(mark as number) ? (mark as number) : null,
      dayChange: Number.isFinite(dayChange as number) ? (dayChange as number) : null,
      updatedAt: Date.now(),
    };

    return NextResponse.json(payload);
  } catch {
    // Handle all fetch/network errors
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
