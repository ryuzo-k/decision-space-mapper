import crypto from "node:crypto";
import { supabaseRequest, supabaseRpc } from "./supabase.mjs";

export function createApiKey() {
  return `sim_${crypto.randomBytes(24).toString("base64url")}`;
}

export function hashApiKey(apiKey) {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}

export async function createCustomerAccess({ email, stripeCustomerId, credits = 0, planId = "starter" }) {
  const now = new Date().toISOString();

  const [user] = await supabaseRequest("/profiles", {
    method: "POST",
    body: JSON.stringify({
      email,
      stripe_customer_id: stripeCustomerId,
      plan_id: planId,
      created_at: now,
      updated_at: now
    })
  });

  const apiKey = await createApiKeyForUser(user.id);

  await supabaseRequest("/credit_accounts", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.id,
      balance: 0
    })
  });

  if (credits) {
    await addCredits(user.id, credits, "initial_purchase");
  }

  return { user: normalizeUser(user), apiKey };
}

export async function createApiKeyForUser(userId, label = "Default") {
  const apiKey = createApiKey();
  const apiKeyHash = hashApiKey(apiKey);
  await supabaseRequest("/api_keys", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      key_hash: apiKeyHash,
      label
    })
  });
  return apiKey;
}

export async function getUserByApiKey(apiKey) {
  const apiKeyHash = hashApiKey(apiKey);
  const keys = await supabaseRequest(`/api_keys?key_hash=eq.${encodeURIComponent(apiKeyHash)}&revoked_at=is.null&select=user_id`);
  const userId = keys[0]?.user_id;
  if (!userId) return null;

  await supabaseRequest(`/api_keys?key_hash=eq.${encodeURIComponent(apiKeyHash)}`, {
    method: "PATCH",
    body: JSON.stringify({ last_used_at: new Date().toISOString() })
  });

  const users = await supabaseRequest(`/profiles?id=eq.${encodeURIComponent(userId)}&limit=1`);
  return users[0] ? normalizeUser(users[0]) : null;
}

export async function getUserByStripeCustomer(stripeCustomerId) {
  const users = await supabaseRequest(`/profiles?stripe_customer_id=eq.${encodeURIComponent(stripeCustomerId)}&limit=1`);
  return users[0] ? normalizeUser(users[0]) : null;
}

export async function addCredits(userId, credits, reason = "credit_grant", metadata = {}) {
  return Number(await supabaseRpc("add_credits", {
    target_user_id: userId,
    credit_delta: credits,
    credit_reason: reason,
    credit_metadata: metadata
  }));
}

export async function getCredits(userId) {
  const rows = await supabaseRequest(`/credit_accounts?user_id=eq.${encodeURIComponent(userId)}&select=balance&limit=1`);
  return Number(rows[0]?.balance || 0);
}

export async function getCreditAccount(userId) {
  const rows = await supabaseRequest(`/credit_accounts?user_id=eq.${encodeURIComponent(userId)}&limit=1`);
  return rows[0] || null;
}

export async function updateAutoTopup(userId, settings) {
  const patch = {};
  if (typeof settings.enabled === "boolean") patch.auto_topup_enabled = settings.enabled;
  if (settings.threshold !== undefined) patch.auto_topup_threshold = Number(settings.threshold);
  if (settings.credits !== undefined) patch.auto_topup_credits = Number(settings.credits);
  patch.updated_at = new Date().toISOString();

  const [row] = await supabaseRequest(`/credit_accounts?user_id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    body: JSON.stringify(patch)
  });
  return row;
}

export async function consumeCredits(userId, credits) {
  return addCredits(userId, -credits, "simulation_usage");
}

export async function upsertPlan(user, planId) {
  const [updated] = await supabaseRequest(`/profiles?id=eq.${encodeURIComponent(user.id)}`, {
    method: "PATCH",
    body: JSON.stringify({
      plan_id: planId,
      updated_at: new Date().toISOString()
    })
  });
  return normalizeUser(updated || { ...user, planId });
}

export async function storeSimulation({ userId, input, result, creditsCharged = 0 }) {
  const [row] = await supabaseRequest("/simulations", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId || null,
      status: "completed",
      artifact_type: input?.artifact?.type || null,
      objective: input?.objective || input?.decision_question || null,
      requested_n: input?.simulation?.target_n || input?.target_n || null,
      credits_charged: creditsCharged,
      request: input || {},
      result,
      completed_at: new Date().toISOString()
    })
  });
  return row;
}

function normalizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    stripeCustomerId: user.stripe_customer_id,
    planId: user.plan_id,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
}
