"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NobitexTrade } from "@/Types/ApiRes";
import {
  fmtPrice,
  NOBITEX_SYMBOLS,
  normalizeSymbol,
} from "@/lib/Helperfunctions";

export default function OrderbookExplorer() {
  const [query, setQuery] = useState("");
  const [symbol, setSymbol] = useState("USDTIRT");
  const [rows, setRows] = useState<NobitexTrade[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toUpperCase();
    const all = [...NOBITEX_SYMBOLS];
    if (!q) return all.slice(0, 80);
    return all.filter((s) => s.includes(q)).slice(0, 120);
  }, [query]);

  const load = useCallback(async (sym: string) => {
    setLoading(true);
    setErr(null);
    try {
      const { data: j } = await axios.get<{
        trades?: NobitexTrade[];
        error?: string;
      }>(`/api/nobitex/trades?symbol=${encodeURIComponent(sym)}`);
      if (j.error) {
        throw new Error(j.error);
      }
      setRows(j.trades ?? []);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setRows([]);
        setErr(
          (e.response?.data as { error?: string } | undefined)?.error ??
            e.message ??
            "خطا",
        );
      } else {
        setRows([]);
        setErr(e instanceof Error ? e.message : "خطا");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(symbol);
  }, [symbol, load]);

  return (
    <div className="mt-6 space-y-5">
      <section className="card-elevated rounded-2xl p-5">
        <label className="text-sm text-slate-300" htmlFor="nq">
          جستجوی نماد
        </label>
        <input
          id="nq"
          dir="ltr"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثلاً BTC"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
        <ul className="mt-3 grid max-h-40 grid-cols-2 gap-1 overflow-y-auto sm:grid-cols-3">
          {list.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => {
                  setSymbol(s);
                  setQuery(s);
                }}
                className={`w-full truncate rounded-lg px-2 py-2 text-left font-mono text-xs ${
                  symbol === s
                    ? "bg-cyan-500/20 text-cyan-100"
                    : "text-slate-400 hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">فعال:</span>
          <span dir="ltr" className="font-mono font-semibold">
            {symbol}
          </span>
          <button
            type="button"
            disabled={loading}
            onClick={() => void load(symbol)}
            className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/5 disabled:opacity-50"
          >
            تازه‌سازی
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/5"
            onClick={() => {
              const s = normalizeSymbol(query);
              if (s) {
                setSymbol(s);
                setQuery(s);
              }
            }}
          >
            اعمال نماد از ورودی
          </button>
        </div>
      </section>

      {err ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
          {err}
        </p>
      ) : null}

      <section className="card-elevated overflow-hidden rounded-2xl">
        <div className="border-b border-white/5 px-4 py-3 text-sm text-slate-400">
          آخرین معاملات ({rows.length.toLocaleString("fa-IR")} ردیف)
        </div>
        {loading && rows.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            در حال دریافت…
          </p>
        ) : (
          <div className="max-h-[28rem] overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-slate-900/95 text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">زمان</th>
                  <th className="px-3 py-2 text-start font-medium">نوع</th>
                  <th className="px-3 py-2 text-start font-medium">قیمت</th>
                  <th className="px-3 py-2 text-end font-medium">حجم</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t, i) => (
                  <tr
                    key={`${t.time}-${i}`}
                    className="border-t border-white/[0.06] font-mono text-slate-300"
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      {new Date(t.time).toLocaleString("fa-IR")}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          t.type === "buy"
                            ? "text-emerald-400"
                            : t.type === "sell"
                              ? "text-rose-400"
                              : "text-slate-400"
                        }
                      >
                        {t.type}
                      </span>
                    </td>
                    <td dir="ltr" className="px-3 py-2">
                      {fmtPrice(t.price)}
                    </td>
                    <td dir="ltr" className="px-3 py-2 text-end text-slate-400">
                      {t.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
