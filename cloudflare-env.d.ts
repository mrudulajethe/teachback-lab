declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    ENABLE_AI?: string;
    AI_PROVIDER?: string;
    AI_GATEWAY_API_KEY?: string;
    AI_GATEWAY_MODEL?: string;
    BUCKET?: R2Bucket;
  }
}
