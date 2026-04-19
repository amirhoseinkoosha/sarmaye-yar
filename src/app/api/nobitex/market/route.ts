import { NextResponse } from "next/server";
import { fetchStatsPair, isAllowedCurrency } from "@/app/api/nobitex/Nobitex.service";

const DEFAULT_SRC = "usdt";
const DEFAULT_DST = "rls";

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const src = (sp.get("srcCurrency") ?? DEFAULT_SRC).trim().toLowerCase();
  const dst = (sp.get("dstCurrency") ?? DEFAULT_DST).trim().toLowerCase();
  if (!isAllowedCurrency(src) || !isAllowedCurrency(dst)) {
    return NextResponse.json(
      { error: "invalid_currency", message: "srcCurrency/dstCurrency نامعتبر است" },
      { status: 400 },
    );
  }

  try {
    const payload = await fetchStatsPair(src, dst);
    if (!payload) {
      return NextResponse.json({ error: "bad_upstream" }, { status: 502 });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
