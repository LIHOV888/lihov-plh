import {
  Gamepad2,
  Globe,
  LifeBuoy,
  Plug,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ServiceConfig } from "@/config/business";

export function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ServiceConfig["icon"];
  className?: string;
}) {
  switch (name) {
    case "Smartphone":
      return <Smartphone className={className} aria-hidden="true" />;
    case "Gamepad2":
      return <Gamepad2 className={className} aria-hidden="true" />;
    case "Globe":
      return <Globe className={className} aria-hidden="true" />;
    case "Sparkles":
      return <Sparkles className={className} aria-hidden="true" />;
    case "Workflow":
      return <Workflow className={className} aria-hidden="true" />;
    case "Plug":
      return <Plug className={className} aria-hidden="true" />;
    case "LifeBuoy":
      return <LifeBuoy className={className} aria-hidden="true" />;
  }
}
