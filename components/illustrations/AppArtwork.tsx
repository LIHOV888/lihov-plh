import type { ComponentType } from "react";
import {
  PipWonderGardenIcon,
  PipWonderGardenScreenshot,
} from "@/components/illustrations/PipWonderGardenArt";
import {
  PlhTunnelVpnIcon,
  PlhTunnelVpnScreenshot,
} from "@/components/illustrations/PlhTunnelVpnArt";
import {
  TraderGodSignalsIcon,
  TraderGodSignalsScreenshot,
} from "@/components/illustrations/TraderGodSignalsArt";

const APP_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "trader-god-signals": TraderGodSignalsIcon,
  "plh-tunnel-vpn": PlhTunnelVpnIcon,
  "pips-wonder-garden": PipWonderGardenIcon,
};

const APP_SCREENSHOTS: Record<
  string,
  ComponentType<{ variant: string; title: string }>
> = {
  "trader-god-signals": TraderGodSignalsScreenshot,
  "plh-tunnel-vpn": PlhTunnelVpnScreenshot,
  "pips-wonder-garden": PipWonderGardenScreenshot,
};

/**
 * Renders the portfolio icon associated with an app ID, falling back cleanly
 * if a new entry is added before custom artwork is created.
 */
export function AppIcon({
  appId,
  className,
}: {
  appId: string;
  className?: string;
}) {
  const Icon = APP_ICONS[appId] ?? PipWonderGardenIcon;
  return <Icon className={className} />;
}

/**
 * Renders a localized preview SVG screen for the specified app ID and variant.
 */
export function AppScreenshot({
  appId,
  variant,
  title,
}: {
  appId: string;
  variant: string;
  title: string;
}) {
  const Screenshot = APP_SCREENSHOTS[appId] ?? PipWonderGardenScreenshot;
  return <Screenshot variant={variant} title={title} />;
}
