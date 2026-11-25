export function PlhTunnelVpnIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PLH Tunnel VPN app icon"
      className={className}
    >
      <defs>
        <linearGradient id="plhBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="plhShield" x1="40" y1="14" x2="40" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="80" height="80" rx="20" fill="url(#plhBg)" />
      {/* Shield outline */}
      <path
        d="M40 14L20 22V40C20 52 29 62 40 66C51 62 60 52 60 40V22L40 14Z"
        fill="url(#plhShield)"
        opacity="0.9"
      />
      {/* Lock keyhole */}
      <circle cx="40" cy="37" r="6" fill="#0F172A" />
      <rect x="37" y="41" width="6" height="8" rx="2" fill="#0F172A" />
      {/* Signal arcs */}
      <path
        d="M28 28C32 23 48 23 52 28"
        stroke="#BAE6FD"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M23 23C30 16 50 16 57 23"
        stroke="#BAE6FD"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function PlhTunnelVpnScreenshot({
  variant,
  title,
}: {
  variant: string;
  title: string;
}) {
  const isHome = variant === "vpn-home";

  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className="h-auto w-full rounded-xl border border-slate-200 dark:border-slate-800"
    >
      {/* Phone frame */}
      <rect width="360" height="220" rx="16" fill="#0F172A" />
      {/* Status bar */}
      <rect x="0" y="0" width="360" height="24" rx="0" fill="#1E293B" />
      <text x="12" y="16" fill="#94A3B8" fontSize="10" fontFamily="monospace">12:00</text>
      <text x="330" y="16" fill="#94A3B8" fontSize="10" fontFamily="monospace">📶</text>

      {isHome ? (
        <>
          {/* VPN Connect screen */}
          <rect x="80" y="40" width="200" height="140" rx="20" fill="#1E3A5F" opacity="0.8" />
          {/* Shield icon */}
          <path
            d="M180 54L162 60V72C162 80 170 86 180 89C190 86 198 80 198 72V60L180 54Z"
            fill="#38BDF8"
          />
          <circle cx="180" cy="70" r="5" fill="#0F172A" />
          <rect x="177.5" y="73" width="5" height="6" rx="2" fill="#0F172A" />
          {/* Connect button */}
          <rect x="130" y="108" width="100" height="32" rx="16" fill="#0EA5E9" />
          <text x="180" y="129" fill="white" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CONNECT</text>
          {/* Server info */}
          <text x="180" y="162" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Free Server · Auto Select</text>
        </>
      ) : (
        <>
          {/* Connected state */}
          <rect x="80" y="40" width="200" height="140" rx="20" fill="#0C4A6E" opacity="0.8" />
          {/* Green shield */}
          <path
            d="M180 54L162 60V72C162 80 170 86 180 89C190 86 198 80 198 72V60L180 54Z"
            fill="#22C55E"
          />
          <path d="M174 71L178 75L187 65" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Status */}
          <circle cx="180" cy="100" r="4" fill="#22C55E" />
          <text x="180" y="115" fill="#86EFAC" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CONNECTED</text>
          {/* Stats */}
          <text x="145" y="140" fill="#94A3B8" fontSize="9" fontFamily="monospace" textAnchor="middle">↑ 1.2 MB/s</text>
          <text x="215" y="140" fill="#94A3B8" fontSize="9" fontFamily="monospace" textAnchor="middle">↓ 3.5 MB/s</text>
          {/* Disconnect button */}
          <rect x="130" y="150" width="100" height="22" rx="11" fill="#1E3A5F" />
          <text x="180" y="165" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Disconnect</text>
        </>
      )}
    </svg>
  );
}
