import { getStore } from "@netlify/blobs";

const UC_CODE_RE = /^[A-Z]{2}\d{5}$|^FPCT$/;
const MAX_BODY_BYTES = 64 * 1024; // 64 KB — enough for hundreds of materials

function corsHeaders(origin) {
  // Restrict to same origin in production; allow any in dev (no secret set)
  const allowOrigin = process.env.API_SECRET ? (origin || "") : "*";
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    "Vary": "Origin",
  };
}

function unauthorized(headers) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
}

function checkAuth(req, context) {
  // Accept either a valid Netlify Identity JWT or the API_SECRET key (admin/CI use)
  if (context.clientContext?.user) return true;
  const secret = process.env.API_SECRET;
  if (!secret) return true; // dev mode
  return req.headers.get("X-API-Key") === secret;
}

export default async (req, context) => {
  const origin = req.headers.get("Origin") || "";
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const url = new URL(req.url);
  const ucCode = url.searchParams.get("uc");

  if (!ucCode || !UC_CODE_RE.test(ucCode)) {
    return new Response(JSON.stringify({ error: "Invalid UC code" }), { status: 400, headers });
  }

  const store = getStore("uc-materials");

  if (req.method === "GET") {
    // GET is read-only — no auth required (materials list is not sensitive)
    const data = await store.get(ucCode, { type: "json" }).catch(() => null);
    return new Response(JSON.stringify(data || []), { headers });
  }

  if (req.method === "POST") {
    if (!checkAuth(req, context)) return unauthorized(headers);

    // Enforce body size limit before parsing
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413, headers });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
    }

    if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ error: "Expected array" }), { status: 400, headers });
    }

    await store.set(ucCode, JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config = { path: "/api/materials" };
