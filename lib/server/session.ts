import { database } from "./database";
import { HttpError } from "./http";
const COOKIE = "teachback_session";
export async function digest(text: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function token(request: Request) {
  const raw = request.headers
    .get("cookie")
    ?.split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith(COOKIE + "="))
    ?.slice(COOKIE.length + 1);
  return raw && /^[a-f0-9]{64}$/.test(raw) ? raw : null;
}
export async function requireLearner(request: Request) {
  const raw = token(request);
  if (!raw)
    throw new HttpError(
      401,
      "Open the adventure again to start a new notebook.",
    );
  const id = await digest(raw);
  const exists = await database()
    .prepare("SELECT id FROM learners WHERE id = ?")
    .bind(id)
    .first();
  if (!exists)
    throw new HttpError(
      401,
      "Open the adventure again to start a new notebook.",
    );
  return id;
}
export async function getOrCreateLearner(request: Request) {
  const raw = token(request);
  if (raw) {
    const id = await digest(raw);
    if (
      await database()
        .prepare("SELECT id FROM learners WHERE id = ?")
        .bind(id)
        .first()
    )
      return { id, cookie: null };
  }
  const fresh = [...crypto.getRandomValues(new Uint8Array(32))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const id = await digest(fresh);
  await database()
    .prepare("INSERT INTO learners(id,created_at) VALUES(?,?)")
    .bind(id, Date.now())
    .run();
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return {
    id,
    cookie: `${COOKIE}=${fresh}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000${secure}`,
  };
}
