import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { providerConfig } from "../lib/server/ai-provider.ts";

test("Vercel uses only its own key and the fixed gateway endpoint", () => {
  const config = providerConfig({ ENABLE_AI: "true", AI_PROVIDER: "vercel", AI_GATEWAY_API_KEY: "synthetic-gateway-key" });
  assert.equal(config.url, "https://ai-gateway.vercel.sh/v1/responses");
  assert.equal(config.model, "openai/gpt-4.1-mini");
  assert.equal(config.apiKey, "synthetic-gateway-key");
  assert.equal(providerConfig({ ENABLE_AI: "true", AI_PROVIDER: "vercel", OPENAI_API_KEY: "synthetic-other-key" }), null);
});

test("missing key, disabled mode and unknown providers fail closed", () => {
  for (const env of [{}, {AI_PROVIDER:"vercel", AI_GATEWAY_API_KEY:"synthetic"}, {ENABLE_AI:"true",AI_PROVIDER:"unknown",OPENAI_API_KEY:"synthetic"}, {ENABLE_AI:"true",AI_PROVIDER:"vercel",AI_GATEWAY_API_KEY:" "}]) {
    assert.equal(providerConfig(env), null);
  }
});

test("direct OpenAI configuration remains supported", () => {
  assert.equal(providerConfig({ENABLE_AI:"true",OPENAI_API_KEY:"synthetic"}).url, "https://api.openai.com/v1/responses");
});

test("both tooling consumers resolve the original disabled-image module", () => {
  for (const consumer of ["next", "miniflare"]) {
    const require = createRequire(import.meta.resolve(`${consumer}/package.json`));
    assert.match(require.resolve("sharp"), /packages\/image-transforms-disabled\/index\.cjs$/);
    assert.throws(() => require("sharp"), /Native image transformations are disabled/);
  }
});
