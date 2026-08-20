import type { AssetTicker } from "@/lib/site";

export function AssetLogo({ ticker }: { ticker: AssetTicker }) {
  switch (ticker) {
    case "TSLA":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path d="M8 12h16l-1.6 2.2H18.4V22h-4.8v-7.8H9.6z" fill="#e31937" />
          <path d="M10 10.2h12c-3.6 1.6-8.4 1.6-12 0z" fill="#e31937" />
        </svg>
      );
    case "AAPL":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path
            d="M20.4 9.4c-.7.8-1.8 1.4-2.9 1.3-.1-1 .4-2 .9-2.7.7-.8 1.9-1.4 2.9-1.4.1 1-.3 2-.9 2.8zM22.2 16.2c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.9-.7c-1.5.1-2.9.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.8 2.2 1.1-.1 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-.1 2.8-2.3.5-.8.7-1.2 1.1-2.1-3-.1-3.5-3.2-3.5-3.3z"
            fill="#f5f5f7"
          />
        </svg>
      );
    case "MSFT":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <rect x="7" y="7" width="8" height="8" fill="#f25022" />
          <rect x="17" y="7" width="8" height="8" fill="#7fba00" />
          <rect x="7" y="17" width="8" height="8" fill="#00a4ef" />
          <rect x="17" y="17" width="8" height="8" fill="#ffb900" />
        </svg>
      );
    case "AMZN":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <text x="16" y="17" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
            a
          </text>
          <path d="M8.2 20.2c4.4 3.2 11.2 3.2 15.6 0" fill="none" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M22.6 19.4l1.6 1.7-.2-2.4" fill="none" stroke="#ff9900" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "NFLX":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path d="M9 7h4.2l5.8 18H14.8z" fill="#e50914" />
          <path d="M18.8 7H23v18h-4.2z" fill="#b20710" />
          <path d="M13.2 7h4.6L23 25h-4.6z" fill="#e50914" />
        </svg>
      );
    case "NVDA":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path
            d="M8 19.2c4.6 2.6 10.2 2.6 16 0-2.8 3.6-8.2 5.2-12.8 3.4-1.8-.7-3.2-2-3.2-3.4z"
            fill="#76b900"
          />
          <path
            d="M10.4 12.6c1.4-1.8 4.2-2.4 6.8-1.4 2.2.8 3.4 2.4 3.2 4.2-2.4-1.4-5.4-1.8-8-1.2-.8.2-1.6.5-2 .8.2-.9 0-1.7 0-2.4z"
            fill="#76b900"
          />
          <circle cx="16.6" cy="15.2" r="1.5" fill="#111" />
        </svg>
      );
    case "GOOGL":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path d="M16 8.4a7.6 7.6 0 0 1 4.8 1.7l-2 2a4.8 4.8 0 0 0-2.8-.8 4.8 4.8 0 0 0-4.5 3.2H8.2A7.6 7.6 0 0 1 16 8.4z" fill="#ea4335" />
          <path d="M23.4 16c0 .5-.1 1-.2 1.5H16v-3h4.2a4.6 4.6 0 0 0-1.6-2.1l2-2A7.5 7.5 0 0 1 23.4 16z" fill="#4285f4" />
          <path d="M11.5 18.7A4.8 4.8 0 0 1 11.3 16a4.8 4.8 0 0 1 .2-2.7H8.2a7.6 7.6 0 0 0 0 5.4z" fill="#fbbc05" />
          <path d="M16 23.6a7.6 7.6 0 0 0 6.5-3.6l-2.2-1.7A4.8 4.8 0 0 1 16 20.8a4.8 4.8 0 0 1-4.5-3.2H8.2A7.6 7.6 0 0 0 16 23.6z" fill="#34a853" />
        </svg>
      );
    case "META":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path
            d="M8.4 18.2c1.2-3.6 3.2-5.6 5.2-5.6 1.5 0 2.4 1.1 3.6 3.4.8 1.6 1.4 2.6 2.2 2.6.9 0 1.8-1.2 2.8-3.6.8-1.8 1.6-2.6 2.6-2.6 1.6 0 3.2 1.8 3.8 4.4"
            fill="none"
            stroke="#0668e1"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M10.2 14.4c.8-1.4 1.8-2.2 3-2.2 1.7 0 2.7 1.4 4 4 1 2 1.7 2.8 2.6 2.8 1.2 0 2.2-1.2 3.4-3.8"
            fill="none"
            stroke="#0668e1"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "BABA":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ff6a00" fontFamily="Arial, sans-serif">
            aA
          </text>
        </svg>
      );
    case "SPOT":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#1db954" />
          <path d="M9 13.2c4.4-1.4 9.6-.8 13.2 1.4" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9.6 17c3.6-1.1 8-.6 11 1.2" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.2 20.4c2.8-.8 6.2-.4 8.6 1" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "DIS":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <ellipse cx="11" cy="12" rx="4.2" ry="3.6" fill="none" stroke="#fff" strokeWidth="1.6" />
          <ellipse cx="21" cy="12" rx="4.2" ry="3.6" fill="none" stroke="#fff" strokeWidth="1.6" />
          <circle cx="16" cy="17.5" r="5.4" fill="none" stroke="#fff" strokeWidth="1.6" />
        </svg>
      );
    case "AMD":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#111" />
          <path d="M8 22V10h8l6 6v6H8zm3.2-3.2h7.6v-3.2L15.6 12.4h-4.4z" fill="#ed1c24" />
        </svg>
      );
    default: {
      const _exhaustive: never = ticker;
      return _exhaustive;
    }
  }
}
