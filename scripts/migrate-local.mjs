import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
const config = "dist/server/wrangler.json";
if (!existsSync(config))
  throw new Error("Run npm run build before npm run db:migrate:local.");
const journal = JSON.parse(readFileSync("drizzle/meta/_journal.json", "utf8"));
// This local-only ledger is intentionally outside Git. Production Sites manages its own migrations.
const ledger = ".wrangler/state/teachback-migrations.json";
const applied = existsSync(ledger)
  ? JSON.parse(readFileSync(ledger, "utf8"))
  : [];
for (const entry of journal.entries) {
  if (applied.includes(entry.tag)) continue;
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "./scripts/sites-env.mjs",
      "./node_modules/wrangler/bin/wrangler.js",
      "d1",
      "execute",
      "DB",
      "--local",
      "--config",
      config,
      "--persist-to",
      ".wrangler/state",
      "--file",
      `drizzle/${entry.tag}.sql`,
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status || 1);
  applied.push(entry.tag);
  mkdirSync(".wrangler/state", { recursive: true });
  writeFileSync(ledger, JSON.stringify(applied, null, 2));
}
console.log("Local notebook database is up to date.");
