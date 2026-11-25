export function TraderGodSignalsIcon({
  className = "h-16 w-16",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Trader God Signals app icon"
      className={className}
    >
      <defs>
        <linearGradient
          id="tgsBg"
          x1="0"
          y1="0"
          x2="80"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#09162A" />
          <stop offset="55%" stopColor="#192644" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient
          id="tgsGold"
          x1="18"
          y1="20"
          x2="62"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="20" fill="url(#tgsBg)" />
      <rect
        x="4"
        y="4"
        width="72"
        height="72"
        rx="17"
        stroke="url(#tgsGold)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* Candlestick bars */}
      <line x1="22" y1="36" x2="22" y2="58" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="42" width="8" height="12" rx="2" fill="#22C55E" />
      <line x1="35" y1="28" x2="35" y2="54" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="31" y="34" width="8" height="14" rx="2" fill="url(#tgsGold)" />
      <line x1="48" y1="22" x2="48" y2="48" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="44" y="26" width="8" height="14" rx="2" fill="#22C55E" />
      {/* Signal trend arrow */}
      <path
        d="M19 52L34 39L45 43L61 23"
        stroke="url(#tgsGold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 23H61V31"
        stroke="#FDE68A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TraderGodSignalsScreenshot({
  variant,
  title,
}: {
  variant: string;
  title: string;
}) {
  const isFeed = variant === "signals-feed";

  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className="h-auto w-full rounded-xl border border-slate-200 dark:border-slate-800"
    >
      <defs>
        <linearGradient
          id={`tgs-screen-${variant}`}
          x1="0"
          y1="0"
          x2="360"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#09162A" />
          <stop offset="100%" stopColor="#192644" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" rx="16" fill={`url(#tgs-screen-${variant})`} />
      {/* Top status bar */}
      <rect x="0" y="0" width="360" height="28" fill="#0F172A" />
      <circle cx="20" cy="14" r="4" fill="#FBBF24" />
      <text
        x="32"
        y="18"
        fill="#FDE68A"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        XAUUSD · GOLD
      </text>
      <rect x="276" y="7" width="68" height="14" rx="7" fill="#1E293B" />
      <text
        x="310"
        y="17"
        fill="#34D399"
        fontSize="8.5"
        fontFamily="monospace"
        textAnchor="middle"
      >
        LIVE
      </text>

      {isFeed ? (
        <>
          {/* Primary Buy Signal Card */}
          <rect
            x="24"
            y="42"
            width="312"
            height="92"
            rx="14"
            fill="#0F172A"
            stroke="#FBBF24"
            strokeOpacity="0.45"
          />
          <rect x="38" y="54" width="54" height="20" rx="6" fill="#16A34A" />
          <text
            x="65"
            y="68"
            fill="#FFFFFF"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            BUY GOLD
          </text>
          <text x="104" y="68" fill="#E2E8F0" fontSize="11" fontFamily="monospace" fontWeight="bold">
            XAUUSD
          </text>
          <text x="278" y="68" fill="#FBBF24" fontSize="10" fontFamily="monospace">
            SL / TP
          </text>
          {/* Levels row */}
          <rect x="38" y="84" width="88" height="36" rx="8" fill="#1E293B" />
          <text x="82" y="98" fill="#94A3B8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
            ENTRY
          </text>
          <text x="82" y="112" fill="#F8FAFC" fontSize="10" fontFamily="monospace" textAnchor="middle">
            Signal Zone
          </text>

          <rect x="136" y="84" width="88" height="36" rx="8" fill="#1E293B" />
          <text x="180" y="98" fill="#94A3B8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
            STOP LOSS
          </text>
          <text x="180" y="112" fill="#F87171" fontSize="10" fontFamily="monospace" textAnchor="middle">
            Protected
          </text>

          <rect x="234" y="84" width="88" height="36" rx="8" fill="#1E293B" />
          <text x="278" y="98" fill="#94A3B8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
            TAKE PROFIT
          </text>
          <text x="278" y="112" fill="#4ADE80" fontSize="10" fontFamily="monospace" textAnchor="middle">
            Target TP
          </text>

          {/* Secondary Notification Banner */}
          <rect x="24" y="148" width="312" height="52" rx="12" fill="#1E293B" opacity="0.85" />
          <circle cx="46" cy="174" r="10" fill="#FBBF24" opacity="0.2" />
          <circle cx="46" cy="174" r="4" fill="#FBBF24" />
          <text x="66" y="170" fill="#F8FAFC" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">
            Instant Push Alert Ready
          </text>
          <text x="66" y="185" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">
            MT4 · MT5 · Exness · Binance · Octa
          </text>
        </>
      ) : (
        <>
          {/* Trend & Price Action Panel */}
          <rect
            x="24"
            y="42"
            width="312"
            height="158"
            rx="14"
            fill="#0F172A"
            stroke="#334155"
          />
          {/* Grid lines */}
          <line x1="40" y1="80" x2="320" y2="80" stroke="#1E293B" strokeDasharray="4 4" />
          <line x1="40" y1="115" x2="320" y2="115" stroke="#1E293B" strokeDasharray="4 4" />
          <line x1="40" y1="150" x2="320" y2="150" stroke="#1E293B" strokeDasharray="4 4" />
          {/* Candlesticks */}
          <rect x="56" y="128" width="12" height="22" rx="2" fill="#EF4444" />
          <rect x="88" y="116" width="12" height="26" rx="2" fill="#22C55E" />
          <rect x="120" y="102" width="12" height="24" rx="2" fill="#22C55E" />
          <rect x="152" y="108" width="12" height="18" rx="2" fill="#EF4444" />
          <rect x="184" y="88" width="12" height="30" rx="2" fill="#22C55E" />
          <rect x="216" y="76" width="12" height="24" rx="2" fill="#FBBF24" />
          <rect x="248" y="64" width="12" height="26" rx="2" fill="#22C55E" />
          {/* Trend line */}
          <path
            d="M58 144L124 114L190 98L254 70L302 58"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="302" cy="58" r="4.5" fill="#22C55E" />
          {/* Bottom metrics */}
          <text x="42" y="182" fill="#FDE68A" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            Price Action &amp; Trend Direction
          </text>
          <rect x="234" y="168" width="88" height="20" rx="10" fill="#1E3A8A" />
          <text
            x="278"
            y="181"
            fill="#93C5FD"
            fontSize="9"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            Risk Managed
          </text>
        </>
      )}
    </svg>
  );
}
