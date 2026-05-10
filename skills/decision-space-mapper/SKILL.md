---
name: decision-space-mapper
description: Map the full decision space for ambiguous or high-stakes choices before recommending a path. Use when a user is deciding what to build, sell, write, change, prioritize, avoid, test, or choose; when they ask for exhaustive options, alternatives, tradeoffs, overlooked paths, "what else is possible?", product/business/career strategy, positioning, pricing, messaging, or a structured set of options.
---

# Decision Space Mapper

## Purpose

Use this skill to turn a vague decision into a structured map of plausible choices. The goal is not to brainstorm a few good ideas or produce one confident recommendation; it is to stop the agent from collapsing too early and expose the shape of the decision space.

This is especially useful for intangible, profit-relevant decisions where the user is choosing among product direction, positioning, pricing, launch plans, content strategy, offers, career moves, or business models.

Treat the output as a decision map:

1. Generate and structure the options.
2. Normalize each option so the user can compare, discuss, test, or act on it.
3. Identify which unknowns matter before the user commits.

## Workflow

### 1. Clarify the Decision Frame

Infer the frame from the user's context. Ask at most one concise question only when the missing information would radically change the option set.

Capture:

- **Decision:** what must be chosen.
- **Desired outcome:** what "good" means.
- **Constraints:** money, time, reputation, energy, skill, team, market, ethics, distribution, geography.
- **Current options:** what the user is already considering.
- **Hidden audience:** whose reaction matters, if any.
- **Irreversibility:** what becomes hard to undo.

If the user provides messy or emotional context, preserve the nuance. Do not sanitize away motivations like boredom, desire for status, urgency, fear, or taste; those often determine which options are real.

### 2. Build the Axes

Before listing options, create 3-7 axes that define the space. Choose axes that produce meaningfully different choices, not generic labels.

Useful axes include:

- Narrow vs broad
- Manual/service vs automated/productized
- Fast cash vs long-term asset
- Audience-led vs self-led
- Distribution-first vs product-first
- Existing demand vs created demand
- Low-trust offer vs trust-heavy offer
- Public/buzzy vs private/enterprise
- Small wedge vs platform bet
- Reversible experiment vs identity-level commitment

For personal decisions, include axes like energy, social cost, identity fit, compounding, optionality, and regret profile.

### 3. Generate the Option Space

Generate enough options to make the space feel complete. Prefer 20-60 options for broad strategy decisions and 8-20 for narrower tactical decisions.

Always include these categories when relevant:

- **Obvious options:** what a reasonable person would already consider.
- **Adjacent options:** one step sideways from the user's current thinking.
- **Inversion options:** do the opposite, remove the premise, or change the target.
- **Extreme options:** overcommit, undercommit, go premium, go tiny, go public, go private.
- **Lazy options:** what to do if the user wants minimum effort.
- **Asset options:** choices that compound into data, audience, code, reputation, or distribution.
- **Cash options:** choices closest to revenue.
- **Learning options:** choices that maximize information gained per unit of effort.
- **No-action or defer options:** sometimes the real option is to wait, preserve optionality, or stop.

Do not collapse distinct options too early. If two options would be perceived differently by users or require different execution, keep both.

### 4. Normalize Options Into Cards

For each meaningful option, write a compact option card. Use this structure unless the user's situation calls for a different shape:

- **Name:** short and concrete.
- **One-line version:** what the user would actually do.
- **Why it exists:** the logic behind it.
- **Who/what it depends on:** audience, channel, capability, resource, timing.
- **What changes if chosen:** the real-world action or commitment.
- **What would need to be true:** assumptions, not predictions.
- **Best use:** when this option is especially fitting.
- **Main risk:** the failure mode that matters.

When an option depends on other people, markets, or stakeholders, also include:

- **Stimulus:** the exact text, offer, profile, product concept, or scenario that can be shown to a person or agent.
- **Who needs to react:** the people whose interpretation matters.
- **What to learn:** trust, desire, confusion, suspicion, willingness to pay, status response, shareability, avoidance, anger, etc.

### 5. Surface Missing Options

After the first pass, explicitly check for blind spots:

- What option is being avoided because it feels socially awkward?
- What option is being avoided because it is too simple?
- What option is obvious to a buyer but not to the builder?
- What option creates distribution before product?
- What option creates cash before software?
- What option gives the user a proprietary dataset or repeated workflow?
- What option uses the user's existing unfair advantage?
- What option should be rejected because it attracts the wrong people?

Add any newly discovered options to the map.

### 6. Compare Without Prematurely Deciding

Only after mapping all options, compare them. Use comparison language that helps the user think, not false precision.

Good comparison dimensions:

- Speed to first evidence
- Revenue proximity
- Distribution advantage
- Trust burden
- Differentiation
- Execution difficulty
- Personal fit
- Downside/reversibility
- Learning value
- Need for external evidence

Avoid presenting a tiny "top 3" as if the rest can be ignored. If you highlight candidates, explain what class of decision each candidate represents and what could make a lower-ranked option win.

### 7. Define the Next Evidence

End by showing what evidence would make the decision clearer. Keep this practical and specific.

Include:

- **Unknowns:** what must be learned before choosing.
- **Evidence source:** user interview, sales call, landing page, public post, prototype, manual service, internal review, market research, or personal experiment.
- **Question to ask:** the exact question or artifact to put in front of people.
- **Signal to watch:** what response, behavior, or constraint would change the decision.
- **Decision rule:** what result would make an option stronger or weaker.

## Output Shape

Use this default structure:

1. **Decision Frame**
2. **Axes**
3. **Option Map**
4. **Blind Spots Added**
5. **Comparison**
6. **Next Evidence**
7. **Next Move**

Keep the answer readable. For very large maps, group options by category and use compact cards. If the user asks for exhaustive depth, expand fully.

## Quality Bar

A good result should make the user say:

- "I had not realized these were all different decisions."
- "This surfaced options I was avoiding."
- "I can see what evidence would actually change the decision."
- "I know what to try next."

A bad result:

- Gives five generic options.
- Recommends too early.
- Uses fake scores or fake market data.
- Treats every problem as startup strategy.
- Ignores the user's personality, constraints, and taste.
- Produces options that cannot be acted on or shown to others.

## References

Read `references/portable-adapters.md` when asked how to package this for Claude Code, Codex, Cursor, generic agents, MCP, or API use.
