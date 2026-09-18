import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const rows = [];
const failures = [];
for (const [location, entry] of Object.entries(lock.packages)) {
  if (!location || entry.link) continue;
  const name = entry.name || location.split("node_modules/").at(-1);
  const license = entry.license || "UNDECLARED";
  if (/sharp-libvips|@img\/sharp-/.test(name) || /(?:^|[^A-Z])(?:A?GPL|LGPL|SSPL)(?:[-\d]|$)/i.test(license)) {
    failures.push(`${name}@${entry.version}: ${license}`);
  }
  if (license === "UNDECLARED") failures.push(`${location}: missing license metadata`);
  if (existsSync(resolve(location, "package.json"))) {
    const installed = JSON.parse(readFileSync(resolve(location, "package.json"), "utf8"));
    if (/sharp-libvips|@img\/sharp-/.test(installed.name || "")) failures.push(`Installed: ${installed.name}`);
  }
  rows.push([name, entry.version || "local", license, entry.dev ? "development" : "runtime/transitive"]);
}
rows.sort((a, b) => a[0].localeCompare(b[0]));
if (process.argv.includes("--write")) {
  const csv = ["package,version,declared_license,scope", ...rows.map(r => r.map(x => `"${x.replaceAll('"', '""')}"`).join(","))].join("\n") + "\n";
  writeFileSync("docs/DEPENDENCY_LICENSES.csv", csv);
} else {
  const inventory = readFileSync("docs/DEPENDENCY_LICENSES.csv", "utf8");
  for (const row of rows) {
    if (!inventory.includes(`"${row[0]}","${row[1]}"`)) failures.push(`Inventory out of date: ${row[0]}`);
  }
}
if (failures.length) throw new Error(`Dependency audit failed:\n${failures.join("\n")}`);
console.log(`Checked ${rows.length} lockfile packages across all platforms: no GPL/LGPL/AGPL/SSPL metadata or native Sharp/libvips packages.`);
const reciprocal = rows.filter(r => /MPL|EPL|CDDL|OSL/.test(r[2]));
if (reciprocal.length) console.warn(`Separate finding: ${reciprocal.length} entries have other reciprocal license metadata. See docs/DEPENDENCIES.md. This check does not certify contest eligibility.`);
