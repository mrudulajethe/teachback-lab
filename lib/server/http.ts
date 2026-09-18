import { z } from "zod";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    throw new HttpError(403, "This request is not allowed.");
}
export async function readJson<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<T> {
  checkOrigin(request);
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "Please send your answer.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8000) {
      await reader.cancel();
      throw new HttpError(413, "That answer is a little too long.");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.length;
  }
  try {
    return schema.parse(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    throw new HttpError(400, "Check your answer and try again.");
  }
}
export function json(
  data: unknown,
  status = 200,
  extra: Record<string, string> = {},
) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}
export function failure(error: unknown) {
  if (error instanceof HttpError)
    return json({ error: error.message }, error.status);
  console.error(
    "Teachback request failed:",
    error instanceof Error ? error.name : "UnknownError",
  );
  return json(
    {
      error:
        "Pip’s notebook is unavailable. Your words are still here—please try again.",
    },
    503,
  );
}
