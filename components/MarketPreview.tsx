"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MarketCat = "forex" | "crypto" | "stocks" | "commodities" | "binary" | "digital";

type MarketRow = {
  pair: string;
  name: string;
  price: number;
  digits: number;
  change: number;
  payout: number;
  spark: number[];
};

const CATS: { id: MarketCat; label: string }[] = [
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

function row(pair: string, name: string, price: number, digits: number, change: number, payout: number): MarketRow {
  return { pair, name, price, digits, change, payout, spark: sparkAround(price) };
}

function cloneRow(item: MarketRow): MarketRow {
  return { ...item, spark: [...item.spark] };
}

function tickRow(item: MarketRow): MarketRow {
  const drift = 1 + (Math.random() - 0.5) * 0.0018;
  const price = item.price * drift;
  return {
    ...item,
    price,
    spark: [...item.spark.slice(1), price],
    change: Math.round((item.change + (Math.random() - 0.5) * 0.05) * 100) / 100,
  };
}

function formatPrice(price: number, digits: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatChange(change: number) {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

function formatPayout(payout: number) {
  return Number.isInteger(payout) ? `${payout}%` : `${payout.toFixed(1)}%`;
}

const DATA: Record<MarketCat, MarketRow[]> = {
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

function Spark({ values, up }: { values: number[]; up: boolean }) {
  const d = useMemo(() => {
    if (values.length < 2) return "";
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * 72;
        const y = 22 - ((v - min) / span) * 18;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg className="market-spark" viewBox="0 0 72 24" aria-hidden>
      <path d={d} fill="none" stroke={up ? "#7dffb0" : "#ff7a88"} strokeWidth="1.6" />
    </svg>
  );
}

function MarketPreviewBoard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [cat, setCat] = useState<MarketCat>("crypto");
  const [rows, setRows] = useState<MarketRow[]>(() => DATA.crypto.map(cloneRow));
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setRows(DATA[cat].map(cloneRow));
    setSelected(0);
  }, [cat]);

  useEffect(() => {
    if (!live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRows((prev) => prev.map(tickRow));
    }, 1600);
    return () => window.clearInterval(id);
  }, [live, cat]);

  const active = rows[selected] ?? rows[0];

  return (
    <div className={`market-board${live ? " on" : ""}`} ref={rootRef}>
      <div className="market-ghost" aria-hidden />
      <div className="market-panel">
        <nav className="market-side" aria-label="Categorias de mercado">
          {CATS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === cat ? "on" : ""}
              onClick={() => setCat(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="market-main">
          <div className="market-top">
            <div>
              <small>Market overview</small>
              <strong>Asset Market</strong>
            </div>
            <span className="market-live">Prévia ilustrativa</span>
          </div>
          <div className="market-head" aria-hidden>
            <span>Ativo</span>
            <span>Preço</span>
            <span>Tendência</span>
            <span>24h</span>
            <span>Payout %</span>
          </div>
          <div className="market-table" role="list">
            {rows.map((item, i) => {
              const up = item.change >= 0;
              return (
                <button
                  key={item.pair}
                  type="button"
                  role="listitem"
                  className={`market-row${i === selected ? " on" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <span>
                    <b>{item.pair}</b>
                    <small>{item.name}</small>
                  </span>
                  <span className="market-price">{formatPrice(item.price, item.digits)}</span>
                  <Spark values={item.spark} up={up} />
                  <span className={up ? "up" : "dn"}>{formatChange(item.change)}</span>
                  <span className="market-payout">{formatPayout(item.payout)}</span>
                </button>
              );
            })}
          </div>
          {active ? (
            <div className="market-foot">
              <span>
                {active.pair} selecionado · payout <b>{formatPayout(active.payout)}</b>
              </span>
              <small>Valores ilustrativos. O payout real aparece na plataforma.</small>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function MarketPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShow(true);
        io.disconnect();
      },
      { rootMargin: "180px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <MarketPreviewBoard /> : <div className="market-board" aria-hidden />}</div>;
}
