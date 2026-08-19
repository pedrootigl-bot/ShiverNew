"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MARKET_CATS,
  MARKET_DATA,
  cloneMarketRow,
  formatMarketChange,
  formatMarketPayout,
  formatMarketPrice,
  tickMarketRow,
  type MarketCat,
  type MarketRow,
} from "@/lib/market";
import { useInViewReplay } from "@/lib/useInViewReplay";

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

export function MarketBoard() {
  const view = useInViewReplay<HTMLDivElement>(0.18);
  const [cat, setCat] = useState<MarketCat>("crypto");
  const [rows, setRows] = useState<MarketRow[]>(() => MARKET_DATA.crypto.map(cloneMarketRow));
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setRows(MARKET_DATA[cat].map(cloneMarketRow));
    setSelected(0);
  }, [cat]);

  useEffect(() => {
    if (!view.on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRows((prev) => prev.map(tickMarketRow));
    }, 1600);
    return () => window.clearInterval(id);
  }, [view.on, cat]);

  const active = rows[selected] ?? rows[0];

  return (
    <div className={`market-board${view.on ? " on" : ""}`} ref={view.ref}>
      <div className="market-ghost" aria-hidden />
      <div className="market-panel">
        <nav className="market-side" aria-label="Categorias de mercado">
          {MARKET_CATS.map((item) => (
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
            {rows.map((row, i) => {
              const up = row.change >= 0;
              return (
                <button
                  key={row.pair}
                  type="button"
                  role="listitem"
                  className={`market-row${i === selected ? " on" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <span>
                    <b>{row.pair}</b>
                    <small>{row.name}</small>
                  </span>
                  <span className="market-price">{formatMarketPrice(row.price, row.digits)}</span>
                  <Spark values={row.spark} up={up} />
                  <span className={up ? "up" : "dn"}>{formatMarketChange(row.change)}</span>
                  <span className="market-payout">{formatMarketPayout(row.payout)}</span>
                </button>
              );
            })}
          </div>
          {active ? (
            <div className="market-foot">
              <span>
                {active.pair} selecionado · payout{" "}
                <b>{formatMarketPayout(active.payout)}</b>
              </span>
              <small>Valores ilustrativos. O payout real aparece na plataforma.</small>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
