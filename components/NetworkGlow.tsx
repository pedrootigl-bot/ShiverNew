export function NetworkGlow() {
  return (
    <div className="network-glow" aria-hidden>
      <svg viewBox="0 0 640 480" fill="none">
        <defs>
          <linearGradient id="ng-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#3ec4f5" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#7ae2ff" />
            <stop offset="100%" stopColor="#2f7bff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ng-cube" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ae2ff" />
            <stop offset="100%" stopColor="#1f5fd6" />
          </linearGradient>
          <filter id="ng-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <circle cx="320" cy="240" r="170" fill="#2f7bff" opacity="0.12" filter="url(#ng-blur)" />
        <g stroke="url(#ng-line)" strokeWidth="1.6">
          <path d="M120 320 L250 210 L390 250 L520 160" />
          <path d="M180 140 L250 210 L320 120 L390 250 L470 300" />
          <path d="M250 210 L180 360 M390 250 L320 360" />
        </g>
        {[
          [120, 320, 22],
          [180, 140, 18],
          [250, 210, 36],
          [320, 120, 20],
          [390, 250, 42],
          [470, 300, 24],
          [520, 160, 28],
          [180, 360, 16],
          [320, 360, 20],
        ].map(([x, y, s]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <polygon points={`0,${-s} ${s * 0.9},${-s * 0.35} ${s * 0.9},${s * 0.35} 0,${s} ${-s * 0.9},${s * 0.35} ${-s * 0.9},${-s * 0.35}`} fill="url(#ng-cube)" opacity="0.92" />
            <polygon points={`0,${-s} ${s * 0.9},${-s * 0.35} 0,0 ${-s * 0.9},${-s * 0.35}`} fill="#c4f4ff" opacity="0.35" />
          </g>
        ))}
      </svg>
    </div>
  );
}
