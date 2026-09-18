// Run only against a local, practice-mode server. Uses synthetic explanations.
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:5173";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error("API smoke tests are restricted to local servers.");
const clients = [];
async function client() {
  const res = await fetch(base + "/api/progress");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.mode, "practice", "Tests require ENABLE_AI=false");
  const cookie = res.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  const run = async (
    path,
    data,
    method = data ? "POST" : "GET",
    origin = base,
  ) => {
    const response = await fetch(base + path, {
      method,
      headers: {
        Cookie: cookie,
        Origin: origin,
        ...(data ? { "Content-Type": "application/json" } : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const text = await response.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = { error: text };
    }
    return { status: response.status, body };
  };
  clients.push(run);
  return run;
}
try {
  const a = await client(),
    b = await client();
  let r = await a(
    "/api/teachback",
    {
      missionId: "water-cycle",
      explanation: "Sunlight warms the water and it goes into the air.",
    },
    "POST",
    "https://untrusted.example",
  );
  assert.equal(r.status, 403);
  assert.equal(
    (
      await a("/api/teachback", {
        missionId: "unknown",
        explanation: "Here is a long enough explanation.",
      })
    ).status,
    404,
  );
  assert.equal(
    (
      await a("/api/teachback", {
        missionId: "water-cycle",
        explanation: "Email my teacher at test@example.com.",
      })
    ).status,
    422,
  );
  const explanation =
    "Sunlight warms the puddle and water changes into vapor in the air.";
  r = await a("/api/teachback", { missionId: "water-cycle", explanation });
  assert.equal(r.status, 200);
  assert.equal(r.body.feedback.mode, "practice");
  const original = r.body.attemptId;
  r = await a("/api/complete", { attemptId: original, answer: 1 });
  assert.equal(r.body.correct, false);
  assert.equal((await a("/api/progress")).body.progress.length, 0);
  assert.equal(
    (await b("/api/complete", { attemptId: original, answer: 0 })).status,
    404,
  );
  r = await a("/api/teachback", {
    missionId: "water-cycle",
    explanation,
    previousAttemptId: original,
  });
  assert.equal(r.body.revisions, 0);
  r = await a("/api/teachback", {
    missionId: "water-cycle",
    explanation: explanation + " This is evaporation, like a wet towel drying.",
    previousAttemptId: original,
  });
  assert.equal(r.body.revisions, 1);
  const revised = r.body.attemptId;
  r = await a("/api/complete", { attemptId: revised, answer: 0 });
  assert.equal(r.body.correct, true);
  assert.equal(r.body.stars, 3);
  await a("/api/complete", { attemptId: revised, answer: 0 });
  await a("/api/complete", { attemptId: original, answer: 0 });
  const saved = (await a("/api/progress")).body.progress;
  assert.equal(saved.length, 1);
  assert.equal(saved[0].stars, 3);
  assert.equal((await b("/api/progress")).body.progress.length, 0);
  console.log(
    "PASS: validation, origin protection, privacy filter, anonymous isolation, wrong-answer recovery, real revision, capped/idempotent rewards, persisted notebook.",
  );
} finally {
  for (const c of clients) {
    const r = await c("/api/progress", undefined, "DELETE");
    assert.equal(r.status, 200);
  }
  console.log("Synthetic test notebooks deleted.");
}
