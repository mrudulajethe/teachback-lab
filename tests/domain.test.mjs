import test from "node:test";
import assert from "node:assert/strict";
import { missions } from "../features/teachback/missions.ts";
import {
  completionStars,
  extractResponseText,
  feedbackSchema,
  hasPersonalContact,
  practiceFeedback,
} from "../features/teachback/evaluation.ts";
test("each lesson has a unique id and one valid transfer answer", () => {
  assert.equal(new Set(missions.map((m) => m.id)).size, missions.length);
  for (const m of missions) {
    assert.ok(m.facts.length >= 3);
    assert.ok(m.check.choices[m.check.answer]);
    assert.equal(new Set(m.check.choices).size, 3);
  }
});
test("practice feedback never pretends to assess a learner", () => {
  for (const m of missions) {
    const f = practiceFeedback(m);
    assert.equal(f.mode, "practice");
    assert.deepEqual(f.concepts, []);
    assert.ok(f.question.includes(m.misconception));
  }
});
test("effort stars are capped and revision is explicit", () => {
  assert.equal(completionStars(0), 2);
  assert.equal(completionStars(1), 3);
  assert.equal(completionStars(100), 3);
});
test("obvious contact details are blocked without rejecting science text", () => {
  assert.equal(hasPersonalContact("Call me at 312-555-1234"), true);
  assert.equal(hasPersonalContact("me@example.com"), true);
  assert.equal(
    hasPersonalContact("Two equal pieces each make 1/2 of the sandwich."),
    false,
  );
});
test("provider refusals and incomplete responses cannot become feedback", () => {
  assert.throws(() =>
    extractResponseText({ status: "incomplete", output: [] }),
  );
  assert.equal(
    extractResponseText({
      status: "completed",
      output: [
        { type: "message", content: [{ type: "refusal", refusal: "No" }] },
      ],
    }),
    "",
  );
  assert.equal(
    extractResponseText({
      status: "completed",
      output: [
        {
          type: "message",
          content: [{ type: "output_text", text: '{"ok":true}' }],
        },
      ],
    }),
    '{"ok":true}',
  );
});
test("AI feedback is bounded and structurally validated", () => {
  assert.equal(
    feedbackSchema.safeParse({
      notice: "a",
      nextStep: "b",
      question: "c",
      concepts: [],
      needsRevision: true,
    }).success,
    true,
  );
  assert.equal(
    feedbackSchema.safeParse({
      notice: "a",
      nextStep: "b",
      question: "c",
      concepts: [],
      needsRevision: "false",
    }).success,
    false,
  );
  assert.equal(
    feedbackSchema.safeParse({
      notice: "x".repeat(1000),
      nextStep: "b",
      question: "c",
      concepts: [],
      needsRevision: false,
    }).success,
    false,
  );
});
