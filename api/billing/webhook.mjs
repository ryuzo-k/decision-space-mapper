import { addCredits, createCustomerAccess, getUserByStripeCustomer, upsertPlan } from "../../src/billing/ledger.mjs";
import { CREDIT_PLANS, getPlan } from "../../src/billing/plans.mjs";
import { verifyStripeSignature } from "../../src/billing/stripe.mjs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const rawBody = await readRawBody(request);
    verifyStripeSignature(rawBody, request.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
    const event = JSON.parse(rawBody);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object);
    }

    response.status(200).json({ received: true });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}

async function handleCheckoutCompleted(session) {
  const plan = getPlan(session.metadata?.plan_id || "starter");
  const credits = plan.credits || plan.monthlyCredits || CREDIT_PLANS.pack_100.credits;
  let user = await getUserByStripeCustomer(session.customer);

  if (!user) {
    const created = await createCustomerAccess({
      email: session.customer_details?.email || session.customer_email,
      stripeCustomerId: session.customer,
      credits,
      planId: plan.id
    });
    return created.user;
  }

  await upsertPlan(user, plan.id);
  await addCredits(user.id, credits);
  return user;
}

function readRawBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => body += chunk);
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}
