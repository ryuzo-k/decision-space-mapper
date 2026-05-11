const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabase() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

export async function supabaseRequest(path, options = {}) {
  if (!hasSupabase()) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1${path}`, {
    ...options,
    headers: {
      "apikey": serviceRoleKey,
      "authorization": `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      "prefer": "return=representation",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.message || data?.hint || `Supabase request failed: ${path}`);
  }
  return data;
}

export async function supabaseRpc(functionName, body) {
  return supabaseRequest(`/rpc/${functionName}`, {
    method: "POST",
    body: JSON.stringify(body || {})
  });
}
