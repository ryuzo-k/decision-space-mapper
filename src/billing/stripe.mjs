import crypto from "node:crypto";

export async function stripeRequest(path, params) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is required.");
  }

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null) body.append(key, String(value));
  }

  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${secret}`,
      "content-type": "application/x-www-form-urlencoded"
    },
    body
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || `Stripe request failed: ${path}`);
  }
  return data;
}

export async function stripeGet(path, params = {}) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is required.");
  }

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null) query.append(key, String(value));
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const response = await fetch(`https://api.stripe.com/v1${path}${suffix}`, {
    headers: {
      "authorization": `Bearer ${secret}`
    }
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || `Stripe GET failed: ${path}`);
  }
  return data;
}

export function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is required.");
  if (!signatureHeader) throw new Error("Missing Stripe signature.");

  const fields = Object.fromEntries(signatureHeader.split(",").map((part) => {
    const [key, value] = part.split("=");
    return [key, value];
  }));

  const timestamp = fields.t;
  const signature = fields.v1;
  if (!timestamp || !signature) throw new Error("Invalid Stripe signature header.");

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new Error("Invalid Stripe signature.");
  }
}
