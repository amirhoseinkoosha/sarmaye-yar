import { NobitexTrade } from "@/Types/ApiRes";
import axios from "axios";


export async function fetchTrades(symbol: string) {
  const url = `https://apiv2.nobitex.ir/v2/trades/${encodeURIComponent(symbol)}`;
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
