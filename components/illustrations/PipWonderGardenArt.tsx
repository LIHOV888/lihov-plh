export function PipWonderGardenIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pip's Wonder Garden app icon"
      className={className}
    >
      <defs>
        <linearGradient id="pipBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="55%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="pipLeaf" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="20" fill="url(#pipBg)" />
      <circle cx="58" cy="22" r="8" fill="#FDE047" opacity="0.9" />
      <path
        d="M40 60V34"
        stroke="#A7F3D0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 44C28 44 22 36 22 28C32 28 40 34 40 44Z"
        fill="url(#pipLeaf)"
      />
      <path
        d="M40 38C52 38 58 30 58 22C48 22 40 28 40 38Z"
        fill="#6EE7B7"
      />
      <ellipse cx="40" cy="61" rx="18" ry="5" fill="#38BDF8" opacity="0.35" />
    </svg>
  );
}

export function PipWonderGardenScreenshot({
  variant,
  title,
}: {
  variant: "garden-overview" | "crafting-bench" | string;
  title: string;
}) {
  const isGarden = variant === "garden-overview";

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
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="360" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isGarden ? "#0F172A" : "#1E1B4B"} />
          <stop offset="100%" stopColor={isGarden ? "#1E3A8A" : "#312E81"} />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill={`url(#bg-${variant})`} />

      {/* Top HUD */}
      <rect x="16" y="14" width="110" height="22" rx="11" fill="#0B1120" opacity="0.7" />
      <circle cx="30" cy="25" r="5" fill="#34D399" />
      <rect x="42" y="21" width="68" height="8" rx="4" fill="#94A3B8" />
      <rect x="268" y="14" width="76" height="22" rx="11" fill="#0B1120" opacity="0.7" />
      <rect x="280" y="21" width="52" height="8" rx="4" fill="#A78BFA" />

      {isGarden ? (
        <>
          {/* Stylized Garden Tiles */}
          <ellipse cx="180" cy="176" rx="145" ry="32" fill="#065F46" opacity="0.7" />
          <ellipse cx="180" cy="166" rx="116" ry="24" fill="#059669" opacity="0.75" />
          {/* Sprouts */}
          <path d="M120 156V130" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="120" cy="122" r="10" fill="#34D399" />
          <path d="M180 154V112" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />
          <circle cx="180" cy="100" r="16" fill="#6EE7B7" />
          <circle cx="180" cy="100" r="7" fill="#FDE047" />
          <path d="M240 156V132" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="240" cy="124" r="10" fill="#38BDF8" />
          {/* Floating Fireflies */}
          <circle cx="90" cy="78" r="3" fill="#FDE047" />
          <circle cx="268" cy="74" r="4" fill="#C4B5FD" />
          <circle cx="222" cy="64" r="2.5" fill="#38BDF8" />
        </>
      ) : (
        <>
          {/* Crafting Grid Preview */}
          <rect x="34" y="56" width="292" height="140" rx="16" fill="#0B1120" opacity="0.75" stroke="#4F46E5" />
          <rect x="54" y="76" width="64" height="64" rx="12" fill="#1E293B" stroke="#38BDF8" />
          <circle cx="86" cy="108" r="14" fill="#34D399" />
          <rect x="148" y="76" width="64" height="64" rx="12" fill="#1E293B" stroke="#8B5CF6" />
          <circle cx="180" cy="108" r="14" fill="#A78BFA" />
          <rect x="242" y="76" width="64" height="64" rx="12" fill="#1E293B" stroke="#2563EB" />
          <circle cx="274" cy="108" r="14" fill="#FDE047" />
          <rect x="98" y="156" width="164" height="22" rx="11" fill="#2563EB" />
        </>
      )}
    </svg>
  );
}
