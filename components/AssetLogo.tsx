import type { AssetTicker } from "@/lib/site";

export function AssetLogo({ ticker }: { ticker: AssetTicker }) {
  switch (ticker) {
    case "TSLA":
      return (
        <svg className="tick-mark tick-tsla" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#111" />
          <path
            fill="#e82127"
            d="M6 9.2h20v3.1h-8.4V24h-3.2V12.3H6z"
          />
          <path fill="#e82127" d="M4.8 7.4 16 5.2 27.2 7.4v2.2H4.8z" />
        </svg>
      );
    case "NFLX":
      return (
        <svg className="tick-mark tick-nflx" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#e50914" />
          <path fill="#fff" d="M9 7h4.2l5.6 12.4V7H23v18h-4.2L13.2 12.6V25H9z" />
        </svg>
      );
    case "MSFT":
      return (
        <svg className="tick-mark tick-msft" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#111820" />
          <rect x="5" y="5" width="10" height="10" fill="#f25022" />
          <rect x="17" y="5" width="10" height="10" fill="#7fba00" />
          <rect x="5" y="17" width="10" height="10" fill="#00a4ef" />
          <rect x="17" y="17" width="10" height="10" fill="#ffb900" />
        </svg>
      );
    case "BABA":
      return (
        <svg className="tick-mark tick-baba" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#ff6a00" />
          <path fill="#fff" d="M16 7.2 8.6 25h3.6l1.5-3.8h4.6L19.8 25H23.4L16 7.2zm0 6.2 1.7 4.4h-3.4z" />
        </svg>
      );
    case "SPOT":
      return (
        <svg className="tick-mark tick-spot" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#1db954" />
          <path
            fill="#191414"
            d="M8.4 12.4c5.4-1.6 11.2-0.8 15.6 1.6.6.4 1.4.2 1.8-.4.4-.6.2-1.4-.4-1.8-5-2.8-11.6-3.6-17.8-1.8-.8.2-1.2 1-.1 1.6.6.2 1.2-.1 1.8-.2zm-.2 3.8c4.6-1.4 9.8-.8 13.6 1.6.6.4 1.4.2 1.8-.3.4-.6.2-1.4-.4-1.8-4.4-2.8-10.4-3.4-15.6-1.8-.7.2-1.1 1-.2 1.6.2.3.5.5.8.7zm11.8 3.2c-3.4-2-8.2-2.4-11.8-1.2-.6.2-1.2-.1-1.4-.7-.2-.6.1-1.2.7-1.4 4.2-1.4 9.6-1 13.6 1.4.5.3.7 1 .3 1.5-.3.6-1 .8-1.4.4z"
          />
        </svg>
      );
    case "DIS":
      return (
        <svg className="tick-mark tick-dis" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#113ccf" />
          <circle cx="8.5" cy="11" r="5.2" fill="#fff" />
          <circle cx="23.5" cy="11" r="5.2" fill="#fff" />
          <circle cx="16" cy="17.2" r="8" fill="#fff" />
        </svg>
      );
    case "OIL":
      return (
        <svg className="tick-mark tick-oil" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#1a1208" />
          <path
            fill="#f0a202"
            d="M16 5c0 0-8 9.2-8 14.4A8 8 0 0 0 16 27a8 8 0 0 0 8-7.6C24 14.2 16 5 16 5z"
          />
          <path fill="#ffe08a" d="M13.2 16.4c1.4-2.6 3.4-5 4.6-6.6-4.8 5.8-5.8 9.2-4.6 6.6z" />
        </svg>
      );
    case "GOLD":
      return (
        <svg className="tick-mark tick-gold" viewBox="0 0 32 32" aria-hidden>
          <rect width="32" height="32" rx="8" fill="#2a2108" />
          <path fill="#f5c842" d="M6 20 16 8l10 12H6z" />
          <path fill="#d4a017" d="M6 20h20l-2.4 5H8.4z" />
          <path fill="#fff3b0" d="M16 8 12.6 20h6.8z" />
        </svg>
      );
    default: {
      const _never: never = ticker;
      return _never;
    }
  }
}
