"use client";

import { NobitexOrderbookPayload } from "@/Types/ApiRes";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatToman, Status } from "@/lib/Helperfunctions";
import { buildPath } from "@/lib/Helperfunctions";

export default function UsdtLiveChart() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<NobitexOrderbookPayload | null>(null);
  const [priceHistory, setPriceHistory] = useState<
    { time: number; priceToman: number }[]
  >([]);

  const load = useCallback(async (opts?: { background?: boolean }) => {
    if (!opts?.background) {
      setStatus((s) => (s === "ready" ? s : "loading"));
    }
    try {
      const { data: json } = await axios.get<
        NobitexOrderbookPayload & { error?: string }
      >("/api/usdt");
      if ("error" in json && json.error) throw new Error(json.error);
      setData(json);
      setPriceHistory((prev) => {
        const next = [...prev, { time: Date.now(), priceToman: json.toman }];
        // حدود ۶ دقیقه تاریخچه (هر ۵ ثانیه) برای سبک ماندن UI
        return next.slice(-72);
      });
      setStatus("ready");
    } catch {
      if (!opts?.background) setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load({ background: true }), 5_000);
    return () => window.clearInterval(id);
  }, [load]);

  const { linePath, areaPath, minY, maxY } = useMemo(() => {
    if (priceHistory.length < 2) {
      return { linePath: "", areaPath: "", minY: 0, maxY: 1 };
    }
    const values = priceHistory.map((p) => p.priceToman);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const pad = Math.max((rawMax - rawMin) * 0.35, 0.0002);
    const min = rawMin - pad;
    const max = rawMax + pad;
    const w = 100;
    const h = 44;
    const pts = priceHistory.map((p, i) => {
      const x = (i / (priceHistory.length - 1)) * w;
      const t = max === min ? 0.5 : (p.priceToman - min) / (max - min);
      const y = h - t * (h - 4) - 2;
      return { x, y };
    });
    const line = buildPath(pts);
    const area =
      line && `${line} L ${w.toFixed(2)} ${h.toFixed(2)} L 0 ${h.toFixed(2)} Z`;
    return { linePath: line, areaPath: area, minY: min, maxY: max };
  }, [priceHistory]);

  const change = data?.dayChange ?? null;
  const changeClass =
    change == null
      ? "text-slate-400"
      : change >= 0
        ? "text-neonGreen"
        : "text-rose-400";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-cyan-950/30 p-4 shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-200/80">
            تتر (USDTIRT)
          </p>
          {status === "ready" && data ? (
            <p
              dir="ltr"
              className="mt-1 font-mono text-2xl font-semibold tracking-tight text-white"
            >
              {formatToman(data.toman)} تومان
            </p>
          ) : status === "error" ? (
            <p className="mt-1 text-sm text-rose-300">خطا در دریافت داده</p>
          ) : (
            <p className="mt-1 font-mono text-2xl font-semibold text-slate-500">
              …
            </p>
          )}
        </div>
        <div className="text-end">
          <p className="text-[11px] text-slate-500">۲۴ ساعت اخیر</p>
          <p dir="ltr" className={`text-sm font-semibold ${changeClass}`}>
            {change == null
              ? "—"
              : `${change >= 0 ? "+" : ""}${change.toFixed(3)}٪`}
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-28 w-full">
        {status === "ready" && linePath ? (
          <svg
            className="h-full w-full"
            viewBox="0 0 100 44"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="usdtFill" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(56, 189, 248)"
                  stopOpacity="0.35"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(56, 189, 248)"
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient id="usdtLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                <stop offset="100%" stopColor="rgb(167, 139, 250)" />
              </linearGradient>
            </defs>
            {areaPath ? (
              <path d={areaPath} fill="url(#usdtFill)" stroke="none" />
            ) : null}
            <path
              d={linePath}
              fill="none"
              stroke="url(#usdtLine)"
              strokeWidth="0.9"
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl bg-white/5 text-sm text-slate-500">
            {status === "error"
              ? "دوباره تلاش کنید"
              : "در حال بارگذاری نمودار…"}
          </div>
        )}
      </div>

      <div className="relative mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-2">
          <span>منبع: Nobitex (market/stats)</span>
          {data?.bestBuy != null && data?.bestSell != null ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
              خرید {formatToman(data.bestBuy / 10)} / فروش{" "}
              {formatToman(data.bestSell / 10)}
            </span>
          ) : null}
        </span>
        <span className="font-mono text-slate-600">
          {data?.updatedAt
            ? new Date(data.updatedAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>
      </div>

      {status === "error" ? (
        <button
          type="button"
          onClick={() => void load()}
          className="relative mt-3 w-full rounded-xl bg-white/10 py-2 text-sm font-medium text-white transition hover:bg-white/15"
        >
          تلاش مجدد
        </button>
      ) : null}

      {/* محور برای نوسان‌های ریز */}
      {status === "ready" && data && linePath ? (
        <p className="relative mt-1 text-center text-[10px] text-slate-600">
          محدوده نمودار: {formatToman(minY)} — {formatToman(maxY)} تومان
        </p>
      ) : null}
    </div>
  );
}
