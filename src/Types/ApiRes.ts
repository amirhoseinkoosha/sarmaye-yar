export type UsdtApiPayload = {
    // USDT price in IRR (from Nobitex market/stats)
    rls: number;
    // USDT price in Toman (IRR / 10)
    toman: number;
    // Best sell price (IRR)
    bestSell: number | null;
    // Best buy price (IRR)
    bestBuy: number | null;
    // Mark price (IRR)
    mark: number | null;
    // Daily change percent (if available)
    dayChange: number | null;
    updatedAt: number;
};

export type NobitexTrade = {
    time: number;
    price: string;
    volume: string;
    type: string;
};

export type NobitexOrderbookPayload = {
    rls: number;
    toman: number;
    bestSell: number | null;
    bestBuy: number | null;
    mark: number | null;
    dayChange: number | null;
    updatedAt: number;
};