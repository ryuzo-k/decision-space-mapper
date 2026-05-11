#!/usr/bin/env node

import http from "node:http";
import { simulateReaction } from "./engine.mjs";
import { loadDotEnv } from "./env.mjs";

loadDotEnv();

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { ok: true, service: "reaction-simulation-api" });
      return;
    }

    if (request.method === "GET" && request.url === "/") {
      sendJson(response, 200, {
        service: "Reaction Simulation API",
        endpoints: {
          health: "GET /health",
          simulate: "POST /simulate"
        }
      });
      return;
    }

    if (request.method === "OPTIONS") {
      sendJson(response, 200, {});
      return;
    }

    if (request.method === "POST" && request.url === "/simulate") {
      const input = await readJson(request);
      const result = await simulateReaction(input);
      sendJson(response, 200, result);
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
});

server.listen(port, host, () => {
  console.log(`Reaction Simulation API listening at http://${host}:${port}`);
  console.log("POST /simulate with an artifact, objective, audience, and optional simulation.target_n.");
});

function sendJson(response, status, data) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  response.end(`${JSON.stringify(data, null, 2)}\n`);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}
