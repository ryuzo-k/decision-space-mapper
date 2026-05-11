import { waitUntil } from "@vercel/functions";
import { simulateReaction } from "../src/simulation/engine.mjs";
import {
  completeSimulationJob,
  consumeCredits,
  createSimulationJob,
  failSimulationJob,
  getCreditAccount,
  getUserByApiKey,
  markSimulationRunning,
  refundSimulationCredits
} from "../src/billing/ledger.mjs";
import { estimateCredits } from "../src/billing/plans.mjs";
import { maybeAutoTopup } from "../src/billing/auto-topup.mjs";
import { handleOptions, setCors } from "../src/http/cors.mjs";

export const config = {
  maxDuration: 300
};

export default async function handler(request, response) {
  if (handleOptions(request, response)) return;
  setCors(response);

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const input = request.body || {};
    const usage = await authorizeUsage(request, input);
    if (usage && usage.creditAccount?.balance < usage.credits) {
      const topup = await maybeAutoTopup({
        user: usage.user,
        creditAccount: usage.creditAccount,
        creditsNeeded: usage.credits,
        reason: "insufficient_balance"
      });
      usage.creditAccount = await getCreditAccount(usage.user.id);
      usage.autoTopup = topup;
    }

    if (usage && usage.creditAccount?.balance < usage.credits) {
      response.status(402).json({
        error: "Insufficient credits.",
        credits_required: usage.credits,
        credits_available: usage.creditAccount.balance,
        auto_topup_enabled: usage.creditAccount.auto_topup_enabled,
        auto_topup: usage.autoTopup
      });
      return;
    }
    if (!usage) {
      const result = await simulateReaction(input);
      response.status(200).json(result);
      return;
    }

    const job = await createSimulationJob({
      userId: usage.user.id,
      input,
      creditsCharged: usage.credits
    });
    const creditsRemaining = await consumeCredits(usage.user.id, usage.credits);
    waitUntil(runSimulationJob({ job, user: usage.user, input, credits: usage.credits }));

    response.status(202).json({
      simulation_id: job.id,
      status: "queued",
      object: {
        type: input?.artifact?.type || "artifact",
        objective: input?.objective || input?.decision_question || null,
        audience: typeof input?.audience === "string" ? input.audience : input?.audience?.description || null
      },
      polling: {
        url: `/api/simulations/${job.id}`,
        recommended_interval_ms: 3000
      },
      downloads: {
        json: `/api/simulations/${job.id}?format=json`,
        markdown: `/api/simulations/${job.id}?format=markdown`
      },
      billing: {
        credits_charged: usage.credits,
        credits_remaining: creditsRemaining,
        auto_topup: usage.autoTopup
      }
    });
  } catch (error) {
    response.status(400).json({
      error: error.message
    });
  }
}

async function runSimulationJob({ job, user, input, credits }) {
  try {
    await markSimulationRunning(job.id, user.id);
    const result = await simulateReaction(input);
    result.simulation_id = job.id;
    result.downloads = {
      json: `/api/simulations/${job.id}?format=json`,
      markdown: `/api/simulations/${job.id}?format=markdown`
    };
    result.billing = {
      credits_charged: credits
    };
    await completeSimulationJob({ simulationId: job.id, userId: user.id, result });

    const latestAccount = await getCreditAccount(user.id);
    if (latestAccount?.balance <= latestAccount?.auto_topup_threshold) {
      await maybeAutoTopup({
        user,
        creditAccount: latestAccount,
        reason: "low_balance"
      });
    }
  } catch (error) {
    await failSimulationJob({ simulationId: job.id, userId: user.id, error });
    await refundSimulationCredits(user.id, credits, job.id).catch(() => null);
  }
}

async function authorizeUsage(request, input) {
  if (process.env.REQUIRE_API_KEY !== "true") return null;

  const apiKey = readApiKey(request);
  if (!apiKey) throw new Error("Missing x-api-key.");

  const user = await getUserByApiKey(apiKey);
  if (!user) throw new Error("Invalid API key.");

  return {
    user,
    credits: estimateCredits(input),
    creditAccount: await getCreditAccount(user.id)
  };
}

function readApiKey(request) {
  const header = request.headers["x-api-key"] || request.headers.authorization;
  return String(header || "").replace(/^Bearer\s+/i, "");
}
