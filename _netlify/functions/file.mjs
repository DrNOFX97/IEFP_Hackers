import { getStore } from "@netlify/blobs";

// Types safe to display inline in the browser (known, non-executable)
const INLINE_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
]);

export default async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  // Prevent path traversal — keys must be safe slugs
  if (!/^[\w.\-]+$/.test(key)) {
    return new Response("Invalid key", { status: 400 });
  }

  const store = getStore("uc-files");
  const result = await store.getWithMetadata(key, { type: "arrayBuffer" }).catch(() => null);

  if (!result || result.data == null) {
    return new Response("File not found", { status: 404 });
  }

  const contentType = result.metadata?.contentType || "application/octet-stream";
  const filename = result.metadata?.filename || key;

  // Only allow inline rendering for safe, known types; force download otherwise
  const disposition = INLINE_TYPES.has(contentType)
    ? `inline; filename="${filename}"`
    : `attachment; filename="${filename}"`;

  return new Response(result.data, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": disposition,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=31536000",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = { path: "/api/file" };
