const API_BASE = location.protocol === "file:" ? "https://tryyomira.com" : "";
const statusEl = document.querySelector("#status");
const submitButton = document.querySelector("#submit-auth");
const registerButton = document.querySelector("#show-register");
const loginButton = document.querySelector("#show-login");
let authMode = "register";

registerButton.addEventListener("click", () => setAuthMode("register"));
loginButton.addEventListener("click", () => setAuthMode("login"));
submitButton.addEventListener("click", () => auth(authMode));

const existingKey = localStorage.getItem("yomira_api_key") || localStorage.getItem("agent_sim_api_key");
const existingUser = localStorage.getItem("yomira_user") || localStorage.getItem("agent_sim_user");
if (existingKey) localStorage.setItem("yomira_api_key", existingKey);
if (existingUser) localStorage.setItem("yomira_user", existingUser);

if (existingKey) {
  statusEl.textContent = "Already signed in. Opening dashboard...";
  setTimeout(() => location.href = "./dashboard.html", 250);
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  registerButton.setAttribute("aria-pressed", String(isRegister));
  loginButton.setAttribute("aria-pressed", String(!isRegister));
  submitButton.textContent = isRegister ? "Create account" : "Log in";
  document.querySelector("#password").autocomplete = isRegister ? "new-password" : "current-password";
  document.querySelectorAll(".register-only").forEach((el) => {
    el.classList.toggle("hidden", !isRegister);
  });
  statusEl.textContent = isRegister
    ? "Create an account to get an API key. Buy credits from the dashboard when you are ready to run simulations."
    : "Log in with your email and password to open your dashboard.";
}

async function auth(mode) {
  submitButton.disabled = true;
  statusEl.textContent = mode === "register" ? "Creating account..." : "Logging in...";
  try {
    const body = {
      email: document.querySelector("#email").value.trim(),
      password: document.querySelector("#password").value
    };

    if (mode === "register") {
      body.name = document.querySelector("#name").value.trim();
      body.companyName = document.querySelector("#company_name").value.trim();
      body.companyUrl = document.querySelector("#company_url").value.trim();
      body.role = document.querySelector("#role").value.trim();
      body.intendedUse = document.querySelector("#intended_use").value.trim();
    }

    const data = await api(`/api/auth/${mode}`, {
      method: "POST",
      body
    });
    localStorage.setItem("yomira_api_key", data.apiKey);
    localStorage.setItem("yomira_user", JSON.stringify(data.user));
    location.href = "./dashboard.html";
  } catch (error) {
    statusEl.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers: { "content-type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
  return data;
}
