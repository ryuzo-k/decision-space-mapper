---
name: decision-space-mapper
description: Generate simulation-ready candidate artifacts for ambiguous or high-stakes choices before recommending a path. Use when a user needs every meaningful version of what they could publish, build, sell, write, launch, price, position, present, send, test, or show to the world; when they ask for exhaustive options, alternatives, overlooked paths, product/business/career strategy, positioning, pricing, messaging, profile/self-presentation, or concrete world-facing outputs.
---

# Decision Space Mapper

## Purpose

Use this skill to turn a vague decision into concrete candidate artifacts. The goal is not to brainstorm abstract directions, build a framework, or produce one confident recommendation; it is to stop the agent from collapsing too early and write the actual things the user could publish, ship, sell, send, test, simulate, or show to the world.

This is especially useful for intangible, profit-relevant decisions where the user is choosing among product direction, positioning, pricing, launch plans, content strategy, offers, career moves, or business models.

Treat the output as a candidate output pack:

1. Identify what kind of output/result the user is choosing.
2. Generate all meaningful concrete versions of that output, grouped by output family.
3. Make each candidate specific enough that a person or simulation agent could react to it.
4. Add only enough explanation for the user to understand what each candidate changes.
5. Identify which real reactions, behaviors, or evidence would make one candidate better than another.

## Non-Negotiable Rule

If another human or simulation agent could not react to the candidate as a real-world stimulus, the answer is not finished.

- For a profile decision, write profile drafts.
- For an offer decision, write offer/package drafts.
- For a landing-page decision, write page sections or full page variants.
- For a product decision, write product concepts with audience, promise, surface, and buying situation.
- For a launch decision, write launch posts, DM scripts, email drafts, waitlist copy, and partner pitches.
- For pricing, write concrete packages, prices, limits, guarantees, and buyer-facing copy.

Never stop at "credibility strategy", "positioning angle", "premium path", or "trust axis". Those can be family names, but the deliverable is the candidate output itself.

Example quality standard:

```text
Weak:
- "Use a credibility-led profile."

Strong:
### Family: Credibility-led profile
- Candidate A: "AI search and AI-native GTM for companies entering Japan. Previously built at [credible background]. Now helping teams turn search, localization, and implementation into pipeline."
- Candidate B: "I build AI-native growth systems for Japanese and overseas companies: search surfaces, GTM workflows, implementation, and measurement."

Each candidate can be shown to a real person or simulated audience. That is the bar.
```

## Workflow

### 1. Clarify the Output Target

Infer the frame from the user's context. Ask at most one concise question only when the missing information would radically change the option set.

Capture:

- **Decision:** what must be chosen.
- **Output surface:** the thing that will exist in the world: profile, landing page, offer, product concept, post, email, pricing page, pitch, roadmap, service package, career narrative, etc.
- **Desired outcome:** what "good" means.
- **Constraints:** money, time, reputation, energy, skill, team, market, ethics, distribution, geography.
- **Current candidates:** what the user is already considering.
- **Hidden audience:** whose reaction matters, if any.
- **Irreversibility:** what becomes hard to undo.

If the user provides messy or emotional context, preserve the nuance. Do not sanitize away motivations like boredom, desire for status, urgency, fear, or taste; those often determine which options are real.

### 2. Define Candidate Output Families

Before writing candidates, create 3-7 candidate output families. A family is a cluster of outputs that would look different in the world and would likely produce different reactions. It can be based on audience, surface, narrative, offer shape, credibility strategy, tone, business model, or constraint.

Do not return abstract headings like "Trust and credibility" unless each heading immediately contains concrete candidates. The heading is scaffolding; the candidates are the product.

Useful output families include:

- **World-facing artifact:** profile draft, landing page section, post, pitch, offer, pricing package, product concept.
- **Audience-specific version:** for buyers, peers, employers, investors, overseas customers, operators, skeptics.
- **Narrative version:** practical, visionary, credibility-heavy, weird/interesting, minimal, premium, honest, provocative.
- **Business version:** service, productized service, SaaS, API, media, community, agency, consulting, marketplace.
- **Proof version:** credential-led, product-led, case-study-led, numbers-led, founder-story-led, no-hype.
- **Tone version:** safe, sharp, warm, technical, executive, indie, corporate, academic, contrarian.
- **Constraint version:** fast to ship, trust-preserving, high-status, low-maintenance, cash-near, long-term asset.

### 3. Generate the Candidate Output Pack by Family

Generate concrete candidates under each family instead of dumping one flat list. Prefer 4-8 families, each with 2-6 candidates. The user should be able to copy, edit, publish, show, test, or feed a candidate into a simulation.

Default format:

```text
## Candidate Output Pack

### Family: Practical buyer-facing profile
- Candidate A: "..."
- Candidate B: "..."
- Candidate C: "..."

### Family: Visionary AI-native agency profile
- Candidate A: "..."
- Candidate B: "..."
- Candidate C: "..."

### Family: Minimal anti-suspicion profile
- Candidate A: "..."
- Candidate B: "..."
- Candidate C: "..."
```

For non-writing decisions, the candidates should still be concrete:

```text
### Family: Productized service
- Candidate A: "AI search audit + implementation sprint for Japanese SMBs"
- Candidate B: "Japan GTM landing-page localization and search-intent API"

### Family: Content-led wedge
- Candidate A: "Weekly teardown of AI-search winners in Japan"
- Candidate B: "Public database of GEO/AIO patterns for Japanese companies"
```

When the candidate is too large to fully write in one answer, include a representative stimulus plus the missing pieces needed to simulate it:

```text
### Family: Premium service offer
- Candidate A
  - Buyer-facing output: "AI Search Revenue Sprint: 2 weeks to turn your existing pages into AI-search surfaces that bring qualified Japanese buyers."
  - Includes: audit, query map, 5 rewritten pages, measurement dashboard, weekly implementation call.
  - Price shown: $8,000 fixed.
  - Simulation stimulus: show this exact offer sentence, package, price, and guarantee to target buyers.
```

Include these candidate families when relevant:

- **Obvious candidates:** what a reasonable person would already make.
- **Adjacent candidates:** one step sideways from the user's current thinking.
- **Inversion candidates:** remove the premise, change the target, or do the opposite.
- **Extreme candidates:** overcommit, undercommit, go premium, go tiny, go public, go private.
- **Lazy candidates:** the simplest acceptable thing to publish or do.
- **Asset candidates:** candidates that compound into data, audience, code, reputation, or distribution.
- **Cash candidates:** candidates closest to revenue.
- **Learning candidates:** candidates that maximize information gained per unit of effort.
- **No-action or defer candidates:** sometimes the concrete result is to wait, preserve optionality, or not publish.

Do not collapse distinct candidates too early. If two outputs would be perceived differently by users or require different execution, keep both.

After the grouped map, optionally add a short **Hybrid Candidates** section for outputs that combine multiple families.

### 4. Calibrate Depth

Do not over-structure too early. Match the depth to the user's need:

- **Rough pack:** output-family headings plus one-line candidate artifacts.
- **Decision-ready pack:** output families, concrete artifacts, and short notes on what each candidate changes.
- **Deep pack:** compact artifact cards for the most important or confusing candidates.
- **Exhaustive pack:** every output family, every meaningful candidate artifact, hybrids, and what evidence would change the choice.

Use compact option cards only when useful. The default should be grouped concrete candidates, not a wall of abstract analysis.

When expanding a candidate into a card, use:

- **Name:** short and concrete.
- **Candidate output:** the actual thing to publish, ship, send, sell, or show.
- **Why it exists:** the logic behind it.
- **What it foregrounds:** what this choice makes visible or important.
- **Who it attracts/repels:** likely audience fit.
- **What changes if chosen:** the real-world action or commitment.
- **Main risk:** the failure mode that matters.

When a candidate depends on other people, markets, or stakeholders, also include:

- **Simulation stimulus:** the exact text, offer, profile, product concept, price, screen, post, or scenario that can be shown to a person or agent.
- **Who needs to react:** the people whose interpretation matters.
- **What to learn:** trust, desire, confusion, suspicion, willingness to pay, status response, shareability, avoidance, anger, etc.

### 5. Surface Missing Options

After the first pass, explicitly check for blind spots:

- What candidate is being avoided because it feels socially awkward?
- What candidate is being avoided because it is too simple?
- What candidate artifact is obvious to a buyer but not to the builder?
- What candidate creates distribution before product?
- What candidate creates cash before software?
- What candidate gives the user a proprietary dataset or repeated workflow?
- What candidate uses the user's existing unfair advantage?
- What candidate should be rejected because it attracts the wrong people?

Add any newly discovered candidates to the pack.

### 6. Compare Without Prematurely Deciding

Only after writing the candidate pack, compare the candidates. Use comparison language that helps the user think, not false precision.

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

Never substitute a tiny "top 3" for the full candidate pack. If you highlight candidates, explain what class of output each candidate represents and what could make a lower-ranked candidate win.

### 7. Define the Next Evidence

End by showing what evidence would make the decision clearer. Keep this practical and specific.

Include:

- **Unknowns:** what must be learned before choosing.
- **Evidence source:** user interview, sales call, landing page, public post, prototype, manual service, internal review, market research, or personal experiment.
- **Question to ask:** the exact question or artifact to put in front of people.
- **Signal to watch:** what response, behavior, or constraint would change the decision.
- **Decision rule:** what result would make a candidate stronger or weaker.

## Output Shape

Use this default structure:

1. **Output Target**
2. **Candidate Output Families**
3. **Candidate Output Pack by Family**
4. **Blind Spots Added**
5. **Comparison**
6. **Next Evidence**
7. **Next Move**

Keep the answer readable. Do not produce a single flat list unless the decision is genuinely tiny. If the user asks for exhaustive depth, expand each output family rather than adding one long undifferentiated list.

## Quality Bar

A good result should make the user say:

- "I now have actual candidates I could publish, ship, sell, send, simulate, or test."
- "I can see what evidence would actually change the decision."
- "I know what to try next."

A bad result:

- Gives five generic candidates.
- Gives only abstract lenses, categories, or strategy words without concrete candidate outputs.
- Dumps 20 candidates in one flat list with no organizing output families.
- Forces every family into an artificial "A vs B" axis.
- Recommends too early.
- Uses fake scores or fake market data.
- Treats every problem as startup strategy.
- Ignores the user's personality, constraints, and taste.
- Produces candidates that cannot be acted on or shown to others.

## References

Read `references/portable-adapters.md` when asked how to package this for Claude Code, Codex, Cursor, generic agents, MCP, or API use.
