const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function hasKv() {
  return Boolean(kvUrl && kvToken);
}

export async function kvCommand(command, ...args) {
  if (!hasKv()) {
    throw new Error("KV_REST_API_URL and KV_REST_API_TOKEN are required for billing/credits.");
  }

  const response = await fetch(kvUrl, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${kvToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify([command, ...args])
  });

  const body = await response.json().catch(() => null);
  if (!response.ok || body?.error) {
    throw new Error(body?.error || `KV command failed: ${command}`);
  }

  return body.result;
}

export async function getJson(key) {
  const value = await kvCommand("GET", key);
  return value ? JSON.parse(value) : null;
}

export async function setJson(key, value) {
  await kvCommand("SET", key, JSON.stringify(value));
}

export async function incrementBy(key, amount) {
  return Number(await kvCommand("INCRBY", key, String(amount)));
}
