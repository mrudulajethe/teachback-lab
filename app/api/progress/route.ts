import { database } from "@/lib/server/database";
import { getOrCreateLearner, requireLearner } from "@/lib/server/session";
import { json, failure, checkOrigin } from "@/lib/server/http";
import { coachMode } from "@/lib/server/coach";
export async function GET(request: Request) {
  try {
    const { id, cookie } = await getOrCreateLearner(request);
    const rows = await database()
      .prepare(
        "SELECT mission_id AS missionId, stars, completed_at AS completedAt FROM progress WHERE learner_id = ? ORDER BY completed_at",
      )
      .bind(id)
      .all();
    return json(
      { progress: rows.results, mode: coachMode() },
      200,
      cookie ? { "Set-Cookie": cookie } : {},
    );
  } catch (e) {
    return failure(e);
  }
}
export async function DELETE(request: Request) {
  try {
    checkOrigin(request);
    const id = await requireLearner(request);
    await database().batch([
      database().prepare("DELETE FROM attempts WHERE learner_id = ?").bind(id),
      database().prepare("DELETE FROM progress WHERE learner_id = ?").bind(id),
      database().prepare("DELETE FROM learners WHERE id = ?").bind(id),
    ]);
    return json({ deleted: true }, 200, {
      "Set-Cookie":
        "teachback_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
    });
  } catch (e) {
    return failure(e);
  }
}
