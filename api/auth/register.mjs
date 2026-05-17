import { createSupabaseUser } from "../../src/billing/auth.mjs";
import { createAccountForAuthUser } from "../../src/billing/ledger.mjs";
import { handleOptions, setCors } from "../../src/http/cors.mjs";

export default async function handler(request, response) {
  if (handleOptions(request, response)) return;
  setCors(response);

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const { email, password, name, companyName, companyUrl, role, intendedUse } = request.body || {};
    validateAuthInput({ email, password, name, companyName, companyUrl, role, intendedUse });
    const authUser = await createSupabaseUser({ email, password });
    const account = await createAccountForAuthUser({
      authUserId: authUser.id,
      email: authUser.email || email,
      profile: {
        name,
        companyName,
        companyUrl,
        role,
        intendedUse
      },
      trialCredits: Number(process.env.TRIAL_CREDITS || 0)
    });
    response.status(200).json({
      user: {
        id: account.user.id,
        email: account.user.email,
        name: account.user.name,
        companyName: account.user.companyName,
        companyUrl: account.user.companyUrl,
        role: account.user.role,
        intendedUse: account.user.intendedUse,
        planId: account.user.planId
      },
      apiKey: account.apiKey,
      credits: account.credits
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}

function validateAuthInput({ email, password, name, companyName, companyUrl, role, intendedUse }) {
  if (!email || !String(email).includes("@")) throw new Error("A valid email is required.");
  if (!password || String(password).length < 8) throw new Error("Password must be at least 8 characters.");
  if (!name || String(name).trim().length < 2) throw new Error("Name is required.");
  if (!companyName || String(companyName).trim().length < 2) throw new Error("Company name is required.");
  if (!companyUrl || !isValidUrl(companyUrl)) throw new Error("A valid company URL is required.");
  if (!role || String(role).trim().length < 2) throw new Error("Role is required.");
  if (!intendedUse || String(intendedUse).trim().length < 4) throw new Error("Tell us what you want to use Yomira for.");
}

function isValidUrl(value) {
  try {
    const text = String(value || "").trim();
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
