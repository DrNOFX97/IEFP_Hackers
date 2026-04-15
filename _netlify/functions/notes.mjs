import { getStore } from "@netlify/blobs";

const UC_CODE_RE = /^[A-Z]{2}\d{5}$|^FPCT$/;
const MAX_NOTE_BYTES = 50 * 1024; // 50 KB per note

export default async (req, context) => {
  const headers = { "Content-Type": "application/json" };

  // Require a valid Netlify Identity JWT
  const user = context.clientContext?.user;
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
  }

  const url = new URL(req.url);
  const ucCode = url.searchParams.get("uc");

  if (!ucCode || !UC_CODE_RE.test(ucCode)) {
    return new Response(JSON.stringify({ error: "Invalid UC code" }), { status: 400, headers });
  }

  const userId = user.sub; // stable unique ID per user
  const store = getStore("uc-notes");
  const key = `${userId}/${ucCode}`;

  if (req.method === "GET") {
    const note = await store.get(key, { type: "text" }).catch(() => null);
    return new Response(JSON.stringify({ note: note || "" }), { headers });
  }

  if (req.method === "POST") {
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > MAX_NOTE_BYTES) {
      return new Response(JSON.stringify({ error: "Note too large (max 50 KB)" }), { status: 413, headers });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
    }

    const note = String(body.note ?? "").slice(0, 50000);
    if (note.trim() === "") {
      await store.delete(key).catch(() => {});
    } else {
      await store.set(key, note);
    }

    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config = { path: "/api/notes" };
