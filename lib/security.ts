/**
 * Security utilities for input sanitization, validation, bot protection,
 * and same-origin CSRF verification on public form endpoints.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ContactSubmissionInput {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  website?: string; // Honeypot field — must remain empty
  formLoadedAt?: number; // Timestamp check to deter instant bot submissions
}

export interface DataDeletionInput {
  fullName: string;
  email: string;
  appName: string;
  accountIdentifier?: string;
  details: string;
  website?: string; // Honeypot field
  formLoadedAt?: number;
}

export interface ValidationResult<T> {
  valid: boolean;
  isBot?: boolean;
  errors: Record<string, string>;
  sanitized?: T;
}

/**
 * Strips ASCII control characters and trims whitespace without mangling
 * Khmer or other Unicode scripts.
 */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates Origin (or Referer when Origin is omitted) against Host / canonical URL
 * to protect POST routes against cross-site request forgery (CSRF).
 */
export function verifySameOrigin(
  originHeader: string | null,
  hostHeader: string | null,
  allowedBaseUrl?: string,
  refererHeader?: string | null
): boolean {
  const candidate = originHeader || refererHeader || null;
  if (!candidate) {
    // Non-browser API/CLI clients (e.g., curl) may omit both Origin and Referer.
    return true;
  }

  try {
    const candidateUrl = new URL(candidate);
    if (hostHeader && candidateUrl.host.toLowerCase() === hostHeader.toLowerCase()) {
      return true;
    }
    if (allowedBaseUrl) {
      const canonical = new URL(allowedBaseUrl);
      if (candidateUrl.origin.toLowerCase() === canonical.origin.toLowerCase()) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export function validateContactSubmission(
  raw: Record<string, unknown>,
  now = Date.now()
): ValidationResult<ContactSubmissionInput> {
  const honeypot = sanitizeText(raw.website, 200);
  if (honeypot.length > 0) {
    return { valid: false, isBot: true, errors: { form: "Spam check triggered." } };
  }

  const formLoadedAt =
    typeof raw.formLoadedAt === "number" ? raw.formLoadedAt : undefined;
  if (formLoadedAt !== undefined && now - formLoadedAt < 1500) {
    return {
      valid: false,
      isBot: true,
      errors: { form: "Submission was too fast. Please wait a moment and try again." },
    };
  }

  const name = sanitizeText(raw.name, 120);
  const email = sanitizeText(raw.email, 160).toLowerCase();
  const subject = sanitizeText(raw.subject, 160);
  const category = sanitizeText(raw.category, 60) || "general";
  const message = sanitizeText(raw.message, 3000);

  const errors: Record<string, string> = {};

  if (name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length < 3) {
    errors.subject = "Please enter a short subject (at least 3 characters).";
  }
  if (message.length < 15) {
    errors.message = "Please provide at least 15 characters describing your inquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: { name, email, subject, category, message },
  };
}

export function validateDataDeletionRequest(
  raw: Record<string, unknown>,
  now = Date.now()
): ValidationResult<DataDeletionInput> {
  const honeypot = sanitizeText(raw.website, 200);
  if (honeypot.length > 0) {
    return { valid: false, isBot: true, errors: { form: "Spam check triggered." } };
  }

  const formLoadedAt =
    typeof raw.formLoadedAt === "number" ? raw.formLoadedAt : undefined;
  if (formLoadedAt !== undefined && now - formLoadedAt < 1500) {
    return {
      valid: false,
      isBot: true,
      errors: { form: "Submission was too fast. Please wait a moment and try again." },
    };
  }

  const fullName = sanitizeText(raw.fullName, 120);
  const email = sanitizeText(raw.email, 160).toLowerCase();
  const appName = sanitizeText(raw.appName, 120);
  const accountIdentifier = sanitizeText(raw.accountIdentifier, 160);
  const details = sanitizeText(raw.details, 2000);

  const errors: Record<string, string> = {};

  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address so we can confirm your request.";
  }
  if (appName.length < 2) {
    errors.appName = "Please specify the application or website service.";
  }
  if (details.length < 10) {
    errors.details = "Please specify what data you would like deleted.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: { fullName, email, appName, accountIdentifier, details },
  };
}
