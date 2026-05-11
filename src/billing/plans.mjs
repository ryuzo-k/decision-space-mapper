export const CREDIT_PLANS = {
  starter: {
    id: "starter",
    name: "Starter Credits",
    mode: "payment",
    amountUsd: 20,
    credits: 200,
    description: "$20 credit pack for trying Agent Simulation API."
  },
  pro: {
    id: "pro",
    name: "Pro",
    mode: "subscription",
    amountUsd: 99,
    monthlyCredits: 1500,
    description: "Monthly plan for regular simulation runs."
  },
  pro_max: {
    id: "pro_max",
    name: "Pro Max",
    mode: "subscription",
    amountUsd: 299,
    monthlyCredits: 6000,
    description: "Monthly plan for heavier simulation and agency use."
  }
};

export function getPlan(planId) {
  const plan = CREDIT_PLANS[planId];
  if (!plan) {
    throw new Error(`Unknown plan: ${planId}`);
  }
  return plan;
}

export function estimateCredits(input = {}) {
  const n = Number(input.simulation?.target_n || input.target_n || 100);
  const provider = input.simulation?.provider || input.provider || "llm";
  const multiplier = provider === "deterministic" || provider === "local" ? 0 : 1;
  return Math.max(1, Math.ceil(n / 10) * multiplier);
}
