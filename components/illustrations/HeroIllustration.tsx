export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-float-slow">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-sky-400/20 blur-2xl dark:from-blue-500/25 dark:via-purple-500/25"
      />
      <svg
        viewBox="0 0 520 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of Android mobile engineering, game systems, and AI architecture"
        className="relative h-auto w-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id="heroCardBg" x1="0" y1="0" x2="520" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
          <linearGradient id="accentBluePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="accentSky" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* Main Studio Console Window */}
        <rect x="24" y="28" width="472" height="364" rx="24" fill="url(#heroCardBg)" stroke="#334155" strokeWidth="1.5" />
        {/* Top bar */}
        <circle cx="54" cy="56" r="5" fill="#475569" />
        <circle cx="72" cy="56" r="5" fill="#475569" />
        <circle cx="90" cy="56" r="5" fill="#475569" />
        <rect x="120" y="49" width="160" height="14" rx="7" fill="#1E293B" />

        {/* Code / Architecture Panel (Left) */}
        <rect x="48" y="88" width="236" height="168" rx="16" fill="#111A2E" stroke="#1E293B" />
        <rect x="66" y="108" width="84" height="10" rx="5" fill="url(#accentSky)" />
        <rect x="66" y="130" width="176" height="8" rx="4" fill="#334155" />
        <rect x="66" y="148" width="142" height="8" rx="4" fill="#334155" />
        <rect x="66" y="166" width="192" height="8" rx="4" fill="#475569" />
        <rect x="66" y="184" width="116" height="8" rx="4" fill="#2563EB" opacity="0.8" />
        <rect x="66" y="208" width="90" height="28" rx="8" fill="url(#accentBluePurple)" />
        <rect x="168" y="208" width="96" height="28" rx="8" fill="#1E293B" stroke="#334155" />

        {/* Mobile Device Frame (Right) */}
        <rect x="308" y="88" width="164" height="276" rx="26" fill="#0B1120" stroke="url(#accentBluePurple)" strokeWidth="2" />
        <rect x="366" y="102" width="48" height="6" rx="3" fill="#334155" />

        {/* Mobile Game / App Screen Preview */}
        <rect x="322" y="120" width="136" height="132" rx="14" fill="#1E293B" />
        <circle cx="390" cy="172" r="34" fill="url(#accentBluePurple)" opacity="0.25" />
        <circle cx="390" cy="172" r="20" fill="url(#accentBluePurple)" />
        <path d="M385 164L399 172L385 180V164Z" fill="#FFFFFF" />
        <rect x="338" y="220" width="104" height="10" rx="5" fill="#475569" />

        {/* Mobile Status Rows */}
        <rect x="322" y="266" width="136" height="32" rx="10" fill="#111A2E" stroke="#1E293B" />
        <circle cx="340" cy="282" r="6" fill="#38BDF8" />
        <rect x="356" y="278" width="82" height="8" rx="4" fill="#475569" />

        <rect x="322" y="308" width="136" height="32" rx="10" fill="#111A2E" stroke="#1E293B" />
        <circle cx="340" cy="324" r="6" fill="#8B5CF6" />
        <rect x="356" y="320" width="68" height="8" rx="4" fill="#475569" />

        {/* Bottom Left AI & Security Nodes */}
        <rect x="48" y="274" width="236" height="90" rx="16" fill="#111A2E" stroke="#1E293B" />
        <circle cx="92" cy="319" r="20" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="166" cy="319" r="20" fill="#1E293B" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="240" cy="319" r="20" fill="#1E293B" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="112" y1="319" x2="146" y2="319" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="186" y1="319" x2="220" y2="319" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="92" cy="319" r="6" fill="#38BDF8" />
        <circle cx="166" cy="319" r="6" fill="#A78BFA" />
        <circle cx="240" cy="319" r="6" fill="#60A5FA" />
      </svg>
    </div>
  );
}
