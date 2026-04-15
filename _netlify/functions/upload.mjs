import { getStore } from "@netlify/blobs";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const MAX_FILENAME_LEN = 200;

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/markdown",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "application/zip",
]);

// Extension → safe content type (never trust client-supplied type alone)
const EXT_TYPE_MAP = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain",
  md: "text/markdown",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  mp4: "video/mp4",
  webm: "video/webm",
  zip: "application/zip",
};

function checkAuth(req, context) {
  if (context.clientContext?.user) return true; // valid Identity JWT
  const secret = process.env.API_SECRET;
  if (!secret) return true; // dev mode
  return req.headers.get("X-API-Key") === secret;
}

export default async (req, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.API_SECRET ? (req.headers.get("Origin") || "") : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    "Vary": "Origin",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers });

  if (!checkAuth(req, context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
  }

  const { filename, base64 } = body;
  if (!filename || !base64) {
    return new Response(JSON.stringify({ error: "Missing filename or base64" }), { status: 400, headers });
  }

  if (filename.length > MAX_FILENAME_LEN) {
    return new Response(JSON.stringify({ error: "Filename too long" }), { status: 400, headers });
  }

  // Determine content type from extension (ignore client-supplied type)
  const ext = filename.split(".").pop().toLowerCase();
  const safeContentType = EXT_TYPE_MAP[ext];
  if (!safeContentType) {
    return new Response(JSON.stringify({ error: "File type not allowed" }), { status: 415, headers });
  }

  const buffer = Buffer.from(base64, "base64");
  if (buffer.byteLength > MAX_BYTES) {
    return new Response(JSON.stringify({ error: "File too large (max 4 MB)" }), { status: 413, headers });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${Date.now()}-${safeName}`;

  const store = getStore("uc-files");
  await store.set(key, buffer, {
    metadata: { contentType: safeContentType, filename: safeName },
  });

  return new Response(JSON.stringify({ url: `/api/file?key=${key}`, key }), { headers });
};

export const config = { path: "/api/upload" };
