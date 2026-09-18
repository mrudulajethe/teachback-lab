import { z } from "zod";
import { getMission } from "@/features/teachback/missions";
import { hasPersonalContact } from "@/features/teachback/evaluation";
import { database } from "@/lib/server/database";
import { requireLearner, digest } from "@/lib/server/session";
import { evaluate } from "@/lib/server/coach";
import { readJson, json, failure, HttpError } from "@/lib/server/http";
const input = z
  .object({
    missionId: z.string().max(50),
    explanation: z.string().trim().min(20).max(1600),
    previousAttemptId: z.string().uuid().optional(),
  })
  .strict();
export async function POST(request: Request) {
  try {
    const body = await readJson(request, input);
    const learner = await requireLearner(request);
    const mission = getMission(body.missionId);
    if (!mission) throw new HttpError(404, "Choose a mission from the island.");
    if (hasPersonalContact(body.explanation))
      throw new HttpError(
        422,
        "Keep names and contact details out of your answer. Just tell Pip about the mission.",
      );
    const recent = await database()
      .prepare(
        "SELECT COUNT(*) AS total FROM attempts WHERE learner_id = ? AND created_at > ?",
      )
      .bind(learner, Date.now() - 60000)
      .first<{ total: number }>();
    if ((recent?.total || 0) >= 10)
      throw new HttpError(
        429,
        "Pip needs a short thinking break. Try again in one minute.",
      );
    const hash = await digest(body.explanation);
    let revisions = 0;
    if (body.previousAttemptId) {
      const previous = await database()
        .prepare(
          "SELECT revisions, explanation_hash FROM attempts WHERE id = ? AND learner_id = ? AND mission_id = ? AND created_at > ?",
        )
        .bind(
          body.previousAttemptId,
          learner,
          mission.id,
          Date.now() - 86400000,
        )
        .first<{ revisions: number; explanation_hash: string }>();
      if (previous)
        revisions =
          previous.revisions + (previous.explanation_hash !== hash ? 1 : 0);
    }
    const id = crypto.randomUUID();
    await database()
      .prepare(
        "INSERT INTO attempts(id,learner_id,mission_id,explanation_hash,revisions,mode,created_at) VALUES(?,?,?,?,?,?,?)",
      )
      .bind(id, learner, mission.id, hash, revisions, "pending", Date.now())
      .run();
    const feedback = await evaluate(mission, body.explanation);
    await database()
      .prepare("UPDATE attempts SET mode = ? WHERE id = ? AND learner_id = ?")
      .bind(feedback.mode, id, learner)
      .run();
    return json({ attemptId: id, feedback, revisions });
  } catch (e) {
    return failure(e);
  }
}
