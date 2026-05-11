const emailInput = document.querySelector("#email");
const claimButton = document.querySelector("#claim");
const claimOutput = document.querySelector("#claim-output");
const apiKeyInput = document.querySelector("#api-key");
const balanceOutput = document.querySelector("#balance-output");
const autoEnabledInput = document.querySelector("#auto-enabled");
const autoThresholdInput = document.querySelector("#auto-threshold");
const autoCreditsInput = document.querySelector("#auto-credits");
const autoOutput = document.querySelector("#auto-output");

for (const button of document.querySelectorAll("[data-plan]")) {
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          planId: button.dataset.plan,
          email: emailInput.value || undefined
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout failed.");
      window.location.href = data.url;
    } catch (error) {
      alert(error.message);
      button.disabled = false;
    }
  });
}

claimButton.addEventListener("click", async () => {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  if (!sessionId) {
    claimOutput.textContent = "No checkout session_id found in the URL.";
    return;
  }
  claimButton.disabled = true;
  const response = await fetch("/api/billing/claim", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId })
  });
  const data = await response.json();
  claimOutput.textContent = JSON.stringify(data, null, 2);
  if (data.apiKey) apiKeyInput.value = data.apiKey;
  claimButton.disabled = false;
});

document.querySelector("#check").addEventListener("click", async () => {
  const response = await fetch("/api/billing/me", {
    headers: { "x-api-key": apiKeyInput.value }
  });
  const data = await response.json();
  balanceOutput.textContent = JSON.stringify(data, null, 2);
  if (data.credit_account) syncAutoTopupForm(data.credit_account);
});

document.querySelector("#save-auto").addEventListener("click", async () => {
  const response = await fetch("/api/billing/auto-topup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKeyInput.value
    },
    body: JSON.stringify({
      enabled: autoEnabledInput.checked,
      threshold: Number(autoThresholdInput.value),
      credits: Number(autoCreditsInput.value)
    })
  });
  const data = await response.json();
  autoOutput.textContent = JSON.stringify(data, null, 2);
  if (data.credit_account) syncAutoTopupForm(data.credit_account);
});

function syncAutoTopupForm(account) {
  autoEnabledInput.checked = Boolean(account.auto_topup_enabled);
  autoThresholdInput.value = account.auto_topup_threshold ?? 50;
  autoCreditsInput.value = account.auto_topup_credits ?? 200;
}
