# Deploy and Billing Plan

## Recommended First Public Shape

Use Vercel for the first public API.

This is enough for:

- `POST /api/simulate`
- demos
- paid concierge/report fulfillment
- early API customers
- agent integrations that call a public endpoint

For N=1000+ simulations, move to an async job model:

1. `POST /api/simulations` creates a job and charges/consumes credits.
2. Workers run agents in batches.
3. `GET /api/simulations/:id` returns status and results.

The first Vercel endpoint can stay sync for smaller runs while we learn.

## What Ryuzo Needs To Provide

Do not paste secrets into chat.

### Vercel

Either:

```bash
npx vercel login
```

Or create a Vercel token and put it in local `.env`:

```bash
VERCEL_TOKEN=...
```

Also decide the Vercel team/account to deploy under.

### OpenAI

Add to Vercel environment variables:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

### Stripe

Fastest paid launch:

- Create Stripe Payment Links for one-time reports or credit packs.
- Put the links on the landing page.
- Fulfill manually or semi-automatically at first.

Later API-credit launch:

```bash
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

This requires:

- checkout session endpoint
- webhook endpoint
- customer/credit store
- API key issuance
- usage metering

## Pricing To Test First

- $19: small run / demo report
- $49: one artifact, one audience, 100 synthetic voices
- $99: one artifact, several audience segments, 300 synthetic voices
- $299: deeper launch/offer report or agency use

For public API credits:

- $10 credit pack
- $49 starter pack
- $199 agency pack

## Why Vercel Is OK First

Vercel Functions with Fluid Compute can run long enough for early simulations on Pro, but a single HTTP request should not become the long-term architecture for thousands of agents. Use sync calls for small N and async jobs for large N.

## What Is Not Needed Yet

- Codex App Server
- full user accounts
- complex dashboard
- X scraping
- real 1000-person interview dataset
- custom billing portal

## First Launch Checklist

1. Deploy `/api/health`.
2. Deploy `/api/simulate`.
3. Set `OPENAI_API_KEY` in Vercel.
4. Add one Stripe Payment Link to the landing page.
5. Publish 2-3 sample simulations.
6. Let early users buy a report or request access.
7. Only after payments happen, build credits/account system.
