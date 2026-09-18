import { z } from "zod";
import { getMission } from "@/features/teachback/missions";
import { completionStars } from "@/features/teachback/evaluation";
import { database } from "@/lib/server/database";
import { requireLearner } from "@/lib/server/session";
import { readJson, json, failure, HttpError } from "@/lib/server/http";
export async function POST(request: Request) {
  try {
    const body = await readJson(
      request,
      z
        .object({
          attemptId: z.string().uuid(),
          answer: z.number().int().min(0).max(2),
        })
        .strict(),
    );
    const learner = await requireLearner(request);
    const attempt = await database()
      .prepare(
        "SELECT mission_id,revisions,mode FROM attempts WHERE id = ? AND learner_id = ? AND created_at > ?",
      )
      .bind(body.attemptId, learner, Date.now() - 86400000)
      .first<{ mission_id: string; revisions: number; mode: string }>();
    if (!attempt || attempt.mode === "pending")
      throw new HttpError(
        404,
        "Explain your idea to Pip again to start this challenge.",
      );
    const mission = getMission(attempt.mission_id);
    if (!mission) throw new HttpError(404, "Mission not found.");
    if (body.answer !== mission.check.answer)
      return json({
        correct: false,
        explanation: "Not quite. Think about this: " + mission.hint,
      });
    const stars = completionStars(attempt.revisions),
      now = Date.now();
    await database().batch([
      database()
        .prepare(
          "INSERT INTO progress(learner_id,mission_id,stars,completed_at) VALUES(?,?,?,?) ON CONFLICT(learner_id,mission_id) DO UPDATE SET stars = MAX(progress.stars,excluded.stars)",
        )
        .bind(learner, mission.id, stars, now),
      database()
        .prepare(
          "UPDATE attempts SET completed = 1 WHERE id = ? AND learner_id = ?",
        )
        .bind(body.attemptId, learner),
    ]);
    return json({
      correct: true,
      stars,
      explanation: mission.check.explanation,
    });
  } catch (e) {
    return failure(e);
  }
}
