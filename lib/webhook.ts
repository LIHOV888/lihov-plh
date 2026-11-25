import { NextResponse } from "next/server";
import { businessConfig } from "@/config/business";

/**
 * Extracts best-effort client IP from reverse proxy headers for rate limiting.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isAllowedWebhookUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol === "https:") return true;
    return (
      process.env.NODE_ENV !== "production" &&
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

/**
 * Delivers a validated submission payload to CONTACT_WEBHOOK_URL with an honest
 * HTTP 503 response whenever automated delivery is unconfigured.
 */
export async function deliverWebhookSubmission({
  eventType,
  payload,
  unconfiguredMessage,
  successMessage,
  upstreamErrorMessage,
  networkErrorMessage,
}: {
  eventType: "contact_inquiry" | "data_deletion_request";
  payload: unknown;
  unconfiguredMessage: string;
  successMessage: string;
  upstreamErrorMessage: string;
  networkErrorMessage: string;
}) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_NOT_CONFIGURED",
        message: unconfiguredMessage,
      },
      { status: 503 }
    );
  }

  if (!isAllowedWebhookUrl(webhookUrl)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_WEBHOOK_CONFIGURATION",
        message: upstreamErrorMessage,
      },
      { status: 502 }
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
    if (secret) {
      headers.Authorization = `Bearer ${secret}`;
    }

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        type: eventType,
        studio: businessConfig.brandName,
        receivedAt: new Date().toISOString(),
        payload,
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: upstreamErrorMessage,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        code: "DELIVERED",
        message: successMessage,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: networkErrorMessage,
      },
      { status: 502 }
    );
  }
}
