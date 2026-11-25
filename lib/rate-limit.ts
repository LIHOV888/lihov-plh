/**
 * In-memory sliding-window rate limiter for public submission endpoints.
 * Note: In serverless deployments (Vercel), per-instance memory provides
 * immediate burst protection; for high-traffic production workloads, pair with
 * Vercel WAF / Upstash Redis rate limiting (documented in SECURITY.md).
 */

interface RateLimitBucket {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const buckets = new Map<string, RateLimitBucket>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
  now = Date.now()
): RateLimitResult {
  const existing = buckets.get(key) ?? { timestamps: [] };
  const windowStart = now - windowMs;
  const recent = existing.timestamps.filter((ts) => ts > windowStart);

  if (recent.length >= limit) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    buckets.set(key, { timestamps: recent });
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  recent.push(now);
  buckets.set(key, { timestamps: recent });

  // Prevent unbounded memory growth in long-lived Node instances
  if (buckets.size > 5000) {
    for (const [bucketKey, bucket] of buckets.entries()) {
      const valid = bucket.timestamps.filter((ts) => ts > windowStart);
      if (valid.length === 0) {
        buckets.delete(bucketKey);
      }
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    retryAfterSeconds: 0,
  };
}

export function resetRateLimitStore(): void {
  buckets.clear();
}
