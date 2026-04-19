import { NextResponse } from "next/server";
import { fetchTrades } from "@/app/api/nobitex/Nobitex.service";
import { normalizeSymbol } from "@/utils/Helperfunctions";

export async function GET(request: Request) {
  const symbol = normalizeSymbol(
    new URL(request.url).searchParams.get("symbol") ?? "",
  );

  if (!symbol) {
    return NextResponse.json({ error: "نماد نامعتبر است" }, { status: 400 });
  }

  try {
    const trades = await fetchTrades(symbol);
    return NextResponse.json({ status: "ok", trades });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "خطا";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
