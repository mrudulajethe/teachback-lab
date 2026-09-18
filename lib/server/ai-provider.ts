export interface AIEnvironment {
  ENABLE_AI?: string;
  AI_PROVIDER?: string;
  AI_GATEWAY_API_KEY?: string;
  AI_GATEWAY_MODEL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
}

// Fixed destinations prevent a settings mistake from sending secrets elsewhere.
export function providerConfig(env: AIEnvironment) {
  if (env.ENABLE_AI !== "true") return null;
  if (env.AI_PROVIDER === "vercel" && env.AI_GATEWAY_API_KEY?.trim()) {
    return {
      provider: "vercel" as const,
      url: "https://ai-gateway.vercel.sh/v1/responses",
      apiKey: env.AI_GATEWAY_API_KEY.trim(),
      model: env.AI_GATEWAY_MODEL || "openai/gpt-4.1-mini",
    };
  }
  if ((!env.AI_PROVIDER || env.AI_PROVIDER === "openai") && env.OPENAI_API_KEY?.trim()) {
    return {
      provider: "openai" as const,
      url: "https://api.openai.com/v1/responses",
      apiKey: env.OPENAI_API_KEY.trim(),
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
    };
  }
  return null;
}
