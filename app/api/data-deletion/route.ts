import { NextResponse } from "next/server";
import { getCanonicalBaseUrl } from "@/config/business";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateDataDeletionRequest, verifySameOrigin } from "@/lib/security";
import { deliverWebhookSubmission, getClientIp } from "@/lib/webhook";

export async function POST(request: Request) {
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
  const rateLimit = checkRateLimit(`deletion:${clientIp}`, 3, 15 * 60 * 1000);
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

  const validation = validateDataDeletionRequest(body);
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
    eventType: "data_deletion_request",
    payload: validation.sanitized,
    unconfiguredMessage:
      "Automated deletion intake relay is not yet configured. Please send your request directly to our official privacy email.",
    successMessage: "Your data deletion request has been submitted.",
    upstreamErrorMessage:
      "Delivery service error. Please email your deletion request directly.",
    networkErrorMessage:
      "Unable to reach the intake relay. Please email your deletion request directly.",
  });
}
