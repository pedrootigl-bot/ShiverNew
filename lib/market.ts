export type MarketCat = "forex" | "crypto" | "stocks" | "commodities" | "binary" | "digital";

export type MarketRow = {
  pair: string;
  name: string;
  price: number;
  digits: number;
  change: number;
  payout: number;
  spark: number[];
};

export const MARKET_CATS: { id: MarketCat; label: string }[] = [
  { id: "forex", label: "Forex" },
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Ações" },
  { id: "commodities", label: "Commodities" },
  { id: "binary", label: "Binárias" },
  { id: "digital", label: "Digital" },
];

function sparkAround(price: number): number[] {
  const wave = [0.992, 0.996, 1.004, 0.998, 1.006, 1.001, 0.997, 1];
  return wave.map((n) => price * n);
}

function row(
  pair: string,
  name: string,
  price: number,
  digits: number,
  change: number,
  payout: number,
): MarketRow {
  return { pair, name, price, digits, change, payout, spark: sparkAround(price) };
}

export const MARKET_DATA: Record<MarketCat, MarketRow[]> = {
  forex: [
    row("EUR/USD", "Euro / Dólar", 1.0842, 4, 0.12, 91),
    row("GBP/JPY", "Libra / Iene", 191.64, 2, -0.28, 90),
    row("USD/BRL", "Dólar / Real", 5.6128, 4, 0.41, 92),
    row("AUD/USD", "Dólar australiano", 0.6619, 4, -0.09, 89),
    row("USD/JPY", "Dólar / Iene", 149.82, 2, 0.18, 91),
  ],
  crypto: [
    row("BTC/USD", "Bitcoin", 67495.3, 2, -0.45, 91),
    row("ETH/USD", "Ethereum", 3528.4, 2, 0.86, 94),
    row("SOL/USD", "Solana", 178.62, 2, 1.14, 93),
    row("XRP/USD", "XRP", 0.6124, 4, -0.22, 90),
    row("BNB/USD", "BNB", 612.18, 2, 0.33, 92),
  ],
  stocks: [
    row("AAPL", "Apple", 228.41, 2, 0.54, 92),
    row("TSLA", "Tesla", 248.9, 2, -1.12, 94),
    row("MSFT", "Microsoft", 421.18, 2, 0.27, 91),
    row("NFLX", "Netflix", 702.35, 2, 0.81, 87),
    row("AMZN", "Amazon", 187.64, 2, -0.16, 90),
  ],
  commodities: [
    row("GOLD", "Ouro", 2486.7, 1, 0.38, 96),
    row("OIL", "Petróleo", 78.42, 2, -0.64, 92),
    row("SILVER", "Prata", 29.18, 2, 0.21, 93),
    row("NATGAS", "Gás natural", 2.184, 3, -0.47, 88),
  ],
  binary: [
    row("EUR/USD", "Opção EUR/USD", 1.0842, 4, 0.12, 91),
    row("BTC/USD", "Opção BTC/USD", 67495.3, 2, -0.45, 94),
    row("GBP/JPY", "Opção GBP/JPY", 191.64, 2, -0.28, 90),
    row("GOLD", "Opção Ouro", 2486.7, 1, 0.38, 97),
    row("USD/BRL", "Opção USD/BRL", 5.6128, 4, 0.41, 92),
  ],
  digital: [
    row("EUR/USD", "Digital EUR/USD", 1.0842, 4, 0.12, 92),
    row("ETH/USD", "Digital ETH/USD", 3528.4, 2, 0.86, 95),
    row("AAPL", "Digital Apple", 228.41, 2, 0.54, 91),
    row("GOLD", "Digital Ouro", 2486.7, 1, 0.38, 96),
    row("USD/JPY", "Digital USD/JPY", 149.82, 2, 0.18, 93),
  ],
};

export function cloneMarketRow(row: MarketRow): MarketRow {
  return { ...row, spark: [...row.spark] };
}

export function tickMarketRow(row: MarketRow): MarketRow {
  const drift = 1 + (Math.random() - 0.5) * 0.0018;
  const price = row.price * drift;
  const spark = [...row.spark.slice(1), price];
  const change = Math.round((row.change + (Math.random() - 0.5) * 0.05) * 100) / 100;
  return { ...row, price, spark, change };
}

export function formatMarketPrice(price: number, digits: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatMarketChange(change: number) {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export function formatMarketPayout(payout: number) {
  return Number.isInteger(payout) ? `${payout}%` : `${payout.toFixed(1)}%`;
}
