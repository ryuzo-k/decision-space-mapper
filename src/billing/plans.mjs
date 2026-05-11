export const CREDIT_PLANS = {
  pack_100: {
    id: "pack_100",
    name: "100 Credits",
    mode: "payment",
    amountUsd: 20,
    credits: 100,
    description: "Starter credit pack for quick checks and early experiments."
  },
  pack_700: {
    id: "pack_700",
    name: "700 Credits",
    mode: "payment",
    amountUsd: 99,
    credits: 700,
    description: "Credit pack for regular content, offer, and message checks."
  },
  pack_2500: {
    id: "pack_2500",
    name: "2,500 Credits",
    mode: "payment",
    amountUsd: 299,
    credits: 2500,
    description: "Credit pack for teams, agencies, and large comparison runs."
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
  if (multiplier === 0) return 0;
  if (n <= 40) return 5;
  if (n <= 120) return 20;
  if (n <= 300) return 60;
  if (n <= 1000) return 250;
  return Math.max(250, Math.ceil(n / 4));
}
