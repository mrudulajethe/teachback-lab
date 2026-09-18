import { z } from "zod";
import type { Feedback, Mission } from "./missions";
export const feedbackSchema = z
  .object({
    notice: z.string().min(1).max(400),
    nextStep: z.string().min(1).max(400),
    question: z.string().min(1).max(240),
    concepts: z.array(z.string().max(120)).max(3),
    needsRevision: z.boolean(),
  })
  .strict();
export function practiceFeedback(mission: Mission): Feedback {
  return {
    mode: "practice",
    notice: "You shared your thinking with Pip. Now let’s explore it together!",
    nextStep: mission.hint,
    question: `Pip wonders: “${mission.misconception}” Can you explain a better idea?`,
    concepts: [],
    needsRevision: true,
  };
}
export const feedbackJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    notice: { type: "string" },
    nextStep: { type: "string" },
    question: { type: "string" },
    concepts: { type: "array", items: { type: "string" } },
    needsRevision: { type: "boolean" },
  },
  required: ["notice", "nextStep", "question", "concepts", "needsRevision"],
};
export function completionStars(revisions: number) {
  return revisions > 0 ? 3 : 2;
}
export function hasPersonalContact(text: string) {
  return /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?:\+?\d[\d ()-]{8,}\d)/.test(text);
}
export function extractResponseText(response: unknown): string {
  const envelope = z
    .object({
      status: z.literal("completed"),
      output: z.array(
        z.object({
          type: z.string(),
          content: z
            .array(z.object({ type: z.string(), text: z.string().optional() }))
            .optional(),
        }),
      ),
    })
    .parse(response);
  return envelope.output
    .flatMap((x) => x.content || [])
    .filter((x) => x.type === "output_text")
    .map((x) => x.text || "")
    .join("");
}
