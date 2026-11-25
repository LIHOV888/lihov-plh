import { NextResponse } from "next/server";
import { businessConfig, getCanonicalBaseUrl } from "@/config/business";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateContactSubmission, verifySameOrigin } from "@/lib/security";
import { deliverWebhookSubmission, getClientIp } from "@/lib/webhook";

export async function POST(request: Request) {
  if (!businessConfig.contactFormEnabled) {
    return NextResponse.json(
      {
        ok: false,
        code: "FORM_DISABLED",
        message: "The contact form is currently disabled.",
      },
      { status: 403 }
    );
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  if (!verifySameOrigin(origin, host, getCanonicalBaseUrl(), referer)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_ORIGIN",
        message: "Cross-origin submission rejected.",
      },
      { status: 403 }
    );
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Invalid request payload.",
      },
      { status: 400 }
    );
  }

  const validation = validateContactSubmission(body);
  if (validation.isBot) {
    return NextResponse.json(
      {
        ok: false,
        code: "SPAM_REJECTED",
        message: "Automated submission rejected.",
      },
      { status: 400 }
    );
  }

  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        errors: validation.errors,
        message: "Please review the highlighted fields.",
      },
      { status: 400 }
    );
  }

  return deliverWebhookSubmission({
    eventType: "contact_inquiry",
    payload: validation.sanitized,
    unconfiguredMessage:
      "Automated form delivery is not yet configured on this server. Please email LIHOV PLH directly.",
    successMessage: "Your inquiry has been delivered to LIHOV PLH.",
    upstreamErrorMessage:
      "The message delivery service returned an error. Please email us directly.",
    networkErrorMessage:
      "Unable to reach the message delivery endpoint. Please contact us directly by email.",
  });
}
