import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
export const learners = sqliteTable("learners", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at").notNull(),
});
export const attempts = sqliteTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    learnerId: text("learner_id")
      .notNull()
      .references(() => learners.id, { onDelete: "cascade" }),
    missionId: text("mission_id").notNull(),
    explanationHash: text("explanation_hash").notNull(),
    revisions: integer("revisions").notNull().default(0),
    mode: text("mode").notNull(),
    completed: integer("completed").notNull().default(0),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("attempts_learner_created").on(t.learnerId, t.createdAt)],
);
export const progress = sqliteTable(
  "progress",
  {
    learnerId: text("learner_id")
      .notNull()
      .references(() => learners.id, { onDelete: "cascade" }),
    missionId: text("mission_id").notNull(),
    stars: integer("stars").notNull(),
    completedAt: integer("completed_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.learnerId, t.missionId] })],
);
